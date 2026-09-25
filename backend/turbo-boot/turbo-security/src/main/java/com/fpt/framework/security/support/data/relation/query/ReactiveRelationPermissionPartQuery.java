//package com.fpt.framework.security.support.data.relation.query;
//
//import com.fpt.framework.data.support.factory.relation.ReactiveRelationQueryBuilder;
//import com.fpt.framework.security.support.AuthorizationService;
//import com.fpt.framework.security.support.data.ReactivePermissionQuery;
//import com.fpt.framework.security.support.data.TargetScopeRelatedRegistries;
//import lombok.Getter;
//import lombok.Setter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.relational.core.query.Criteria;
//import org.springframework.r2dbc.core.PreparedOperation;
//import reactor.core.publisher.Mono;
//
//import java.util.List;
//
//@Setter
//@Getter
//public class ReactiveRelationPermissionPartQuery implements ReactiveRelationQueryBuilder<String> {
//
//
//    @Autowired
//    private AuthorizationService authorizationService;
//
//    @Autowired
//    private TargetScopeRelatedRegistries targetScopeRelatedRegistries;
//
//
//    public Mono<List<Criteria>> buildPermissionCriteria() {
//        ReactivePermissionQuery permissionQuery = new ReactivePermissionQuery(authorizationService, targetScopeRelatedRegistries);
//        return permissionQuery.buildPermission((s, currentUser) -> Criteria.where(s.getTarget()).in(permissionQuery.replaceDataCriteria(s.getData(), currentUser)));
//    }
//
//    @Override
//    public Mono<PreparedOperation<String>> build(Mono<PreparedOperation<String>> query) {
//        return null;
//    }
//}
