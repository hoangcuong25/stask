package com.fpt.framework.security.support.data.nonrelation.query;

import com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationQueryBuilder;
import com.fpt.framework.security.model.PermissionCriteria;
import com.fpt.framework.security.model.PermissionScope;
import com.fpt.framework.security.support.AuthorizationService;
import com.fpt.framework.security.support.data.ReactivePermissionQuery;
import com.fpt.framework.security.support.data.TargetScopeRelatedRegistries;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.query.ConvertingParameterAccessor;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

import static com.fpt.framework.security.model.PermissionPolicy.SCOPE_OPERATOR_AND;
import static com.fpt.framework.security.model.PermissionPolicy.SCOPE_OPERATOR_OR;

public class ReactiveNonRelationPermissionQuery implements ReactiveNoneRelationQueryBuilder {

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private TargetScopeRelatedRegistries targetScopeRelatedRegistries;


    @Override
    public Mono<Query> build(Mono<Query> query, ConvertingParameterAccessor accessor) {
        return query.zipWith(buildPermissionCriteriaWithScopeOperator(), (t, p) ->
                appendQuery(t, p, SCOPE_OPERATOR_OR)
        );
    }

    public Query appendQuery(Query t, List<PermissionCriteria<Criteria>> permissionCriteriaList, String scopeOperator) {
        if (permissionCriteriaList.isEmpty()) {
            return t;
        }
        List<Criteria> criterias = new ArrayList<>();
        for (PermissionCriteria<Criteria> pc : permissionCriteriaList) {
            if (SCOPE_OPERATOR_AND.equalsIgnoreCase(pc.getScopeOperator())) {
                criterias.add(new Criteria().andOperator(pc.getCriterias()));
                continue;
            }
            criterias.add(new Criteria().orOperator(pc.getCriterias()));
        }

        Document q = new Document();
        List<Document> permissionQuery = new ArrayList<>();
        permissionQuery.add(t.getQueryObject());
        if (SCOPE_OPERATOR_AND.equalsIgnoreCase(scopeOperator)) {
            permissionQuery.add(new Criteria().andOperator(criterias).getCriteriaObject());
        } else if (SCOPE_OPERATOR_OR.equalsIgnoreCase(scopeOperator)) {
            permissionQuery.add(new Criteria().orOperator(criterias).getCriteriaObject());
        }
        // TODO: turning duplicate key with previous query
        q.append("$and",permissionQuery);
        BasicQuery basicQuery = new BasicQuery(q);
        basicQuery.setSortObject(t.getSortObject());
        basicQuery.setMeta(t.getMeta());
        basicQuery.limit(t.getLimit());
        basicQuery.skip(t.getSkip());
        t = basicQuery;
        return t;
    }

    public Mono<List<Criteria>> buildPermissionCriteria() {
        ReactivePermissionQuery permissionQuery = new ReactivePermissionQuery(authorizationService, targetScopeRelatedRegistries);
        return permissionQuery.buildPermission((s, currentUser)
                -> Criteria.where(s.getTarget()).all(permissionQuery.replaceDataCriteria(s.getData(), currentUser)));
    }

    public Mono<List<PermissionCriteria<Criteria>>> buildPermissionCriteriaWithScopeOperator() {
        ReactivePermissionQuery permissionQuery = new ReactivePermissionQuery(authorizationService, targetScopeRelatedRegistries);
        return permissionQuery.buildPermissionCriteria((s, currentUser)
                -> buildCriteriaFromScope(s, permissionQuery, currentUser))
                .switchIfEmpty(Mono.just(new ArrayList<>()));
    }

    private Criteria buildCriteriaFromScope(PermissionScope s, ReactivePermissionQuery permissionQuery, String currentUser) {
        List<Object> replacedValueData = permissionQuery.replaceDataCriteria(s.getData(), currentUser);
        List<Criteria> criteriaList = replacedValueData.stream().map(d -> Criteria.where(s.getTarget()).is(d)).toList();
        return new Criteria().orOperator(criteriaList);
    }
}
