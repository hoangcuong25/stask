package com.fpt.framework.security.support.data.relation.query;

import com.fpt.framework.data.support.factory.relation.ReactiveRelationQueryBuilder;
import com.fpt.framework.security.support.AuthorizationService;
import com.fpt.framework.security.support.data.ReactivePermissionQuery;
import com.fpt.framework.security.support.data.TargetScopeRelatedRegistries;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.repository.query.RelationalParameterAccessor;
import org.springframework.r2dbc.core.PreparedOperation;
import org.springframework.r2dbc.core.binding.BindTarget;
import reactor.core.publisher.Mono;

import java.util.List;

@Setter
@Getter
public class ReactiveRelationPermissionStringQuery implements ReactiveRelationQueryBuilder<String> {


    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private TargetScopeRelatedRegistries targetScopeRelatedRegistries;


    private Mono<List<String>> buildPermissionQuery() {
        ReactivePermissionQuery permissionQuery = new ReactivePermissionQuery(authorizationService, targetScopeRelatedRegistries);
        return permissionQuery.buildPermission((s, currentUser) -> {
            String dataTarget = String.join(",", permissionQuery.replaceDataCriteria(s.getData(), currentUser).stream().map(Object::toString).toList());
            return String.format("%s %s (%s)", s.getTarget(), "IN", dataTarget);
        });
    }

    @Override
    public Mono<PreparedOperation<String>> build(Mono<PreparedOperation<String>> query,
                                                 RelationalParameterAccessor accessor) {
        return query.zipWith(buildPermissionQuery(),
                (prepared, q) -> new ReactiveRelationPermissionStringQuery.ExpandedQuery(prepared, q));
    }

    private class ExpandedQuery implements PreparedOperation<String> {

        private final PreparedOperation<?> declare;
        private String tableAlias = RandomStringUtils.random(6, true, true);
        private List<String> appendCriteria;

        private ExpandedQuery(PreparedOperation<?> declare, List<String> appendCriteria) {
            this.declare = declare;
            this.appendCriteria = appendCriteria;
        }

        @Override
        public String getSource() {
            return this.toQuery();
        }

        @Override
        public void bindTo(BindTarget target) {
            this.declare.bindTo(target);
        }

        @Override
        public String toQuery() {
            if (appendCriteria.isEmpty()) {
                return declare.toQuery();
            }
            return toQueryWithPermission();
        }

        private String toQueryWithPermission() {
            StringBuilder sb = new StringBuilder();
            sb.append("SELECT * FROM (");
            sb.append(this.declare.toQuery());
            sb.append(") as ");
            sb.append(tableAlias);
            sb.append(" WHERE ");

            for (int i = 0, length = appendCriteria.size(); i < length; i++) {
                var criteria = appendCriteria.get(i);
                sb.append(tableAlias);
                sb.append(".");
                sb.append(criteria);
                if (i < length - 1) {
                    sb.append(" AND ");
                }
            }
            return sb.toString();
        }
    }
}
