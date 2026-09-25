package com.fpt.framework.security.support.data;

import com.fpt.framework.security.model.PermissionCriteria;
import com.fpt.framework.security.model.PermissionPolicy;
import com.fpt.framework.security.model.PermissionScope;
import com.fpt.framework.security.support.AuthenticationContext;
import com.fpt.framework.security.support.AuthorizationContext;
import com.fpt.framework.security.support.AuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.util.CollectionUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.BiFunction;

import static com.fpt.framework.security.model.PermissionPolicy.SCOPE_OPERATOR_AND;
import static com.fpt.framework.security.model.PermissionPolicy.SCOPE_OPERATOR_OR;

@AllArgsConstructor
public class ReactivePermissionQuery {

    private AuthorizationService authorizationService;

    private TargetScopeRelatedRegistries targetScopeRelatedRegistries;
    
    public <T> Mono<List<T>> buildPermission(BiFunction<PermissionScope, String, T> builder) {
        return AuthorizationContext.currentAuthorPolicy()
                .zipWith(AuthenticationContext.currentUserPrincipal())
                .flatMap(res -> {
                    String resource = res.getT1().getResource();
                    String action = res.getT1().getAction();
                    String currentUser = res.getT2().getUniqueName();
                    boolean autoFilter = res.getT1().isAutoFilter();
                    if (!autoFilter) {
                        return Mono.just(new ArrayList<T>());
                    }
                    return this.authorizationService.readPermissions(resource, action)
                            .collectList()
                            .map(ps -> {
                                List<T> query = new ArrayList<>();
                                for (PermissionPolicy p : ps) {
                                    List<PermissionScope> permitScopes = p.getScopes();
                                    for (PermissionScope s: permitScopes) {
                                        if (!s.hasPermit()) {
                                            continue;
                                        }
                                        var data = s.getData();
                                        boolean isDataAllScope = data!= null && !data.isEmpty() && data.contains(PermissionScope.SCOPE_DATA_ALL);
                                        if (isDataAllScope) {
                                            query.clear();
                                            return query;
                                        }
                                        if (data!= null && !data.isEmpty()
                                                && !data.contains(PermissionScope.SCOPE_DATA_ALL)) {
                                            String targetKey = s.getTarget();
                                            TargetScopeRelatedResolver targetScopeRelatedResolver
                                                    = targetScopeRelatedRegistries.getTargetScopeRelatedResolver(targetKey);
                                            List<Object> scopeData = targetScopeRelatedResolver.resolveRelatedTarget(s.getData());
                                            s.setData(scopeData);
                                            query.add(builder.apply(s, currentUser));
                                        }
                                    }
                                }
                                return query;
                            });
                }).switchIfEmpty(Mono.just(new ArrayList<>()));
    }

    public <T> Mono<List<PermissionCriteria<Criteria>>> buildPermissionCriteria(BiFunction<PermissionScope, String, T> builder) {
        return AuthorizationContext.currentAuthorPolicy()
                .zipWith(AuthenticationContext.currentUserPrincipal())
                .flatMap(res -> {
                    String resource = res.getT1().getResource();
                    String action = res.getT1().getAction();
                    String currentUser = res.getT2().getUniqueName();
                    boolean autoFilter = res.getT1().isAutoFilter();
                    if (!autoFilter) {
                        return Mono.just(new ArrayList<>());
                    }
                    return this.authorizationService.readPermissions(resource, action)
                            .collectList()
                            .map(ps -> {
                                List<PermissionCriteria<Criteria>> permissionCriterias = new ArrayList<>();
                                for (PermissionPolicy p : ps) {
                                    List<Criteria> criterias = new ArrayList<>();
                                    List<PermissionScope> permitScopes = p.getScopes();
                                    PermissionCriteria<Criteria> pc = new PermissionCriteria<>();
                                    pc.setScopeOperator(p.getScopeOperator());
                                    for (PermissionScope s: permitScopes) {
                                        var data = s.getData();
                                        if (!s.hasPermit() || data == null || data.isEmpty()) {
                                            continue;
                                        }
                                        if (data.contains(PermissionScope.SCOPE_DATA_ALL)) {
                                            if (SCOPE_OPERATOR_AND.equalsIgnoreCase(pc.getScopeOperator())) {
                                                continue;
                                            }
                                            criterias.clear();
                                            break;
                                        }
                                        String targetKey = s.getTarget();
                                        TargetScopeRelatedResolver targetScopeRelatedResolver
                                                = targetScopeRelatedRegistries.getTargetScopeRelatedResolver(targetKey);
                                        List<Object> scopeData = targetScopeRelatedResolver.resolveRelatedTarget(s.getData());
                                        s.setData(scopeData);

                                        PermissionCriteria<Criteria> compoundPermissionCriteria = new PermissionCriteria<>();
                                        if (!CollectionUtils.isEmpty(s.getCompoundScopes())) {
                                            List<Criteria> csCriterias = new ArrayList<>();
                                            compoundPermissionCriteria.setScopeOperator(s.getScopeOperator());
                                            for (PermissionScope cs : s.getCompoundScopes()) {
                                                var csData = cs.getData();
                                                if (!cs.hasPermit() || csData == null || csData.isEmpty()) {
                                                    continue;
                                                }
                                                if (csData.contains(PermissionScope.SCOPE_DATA_ALL)) {
                                                    if (SCOPE_OPERATOR_AND.equalsIgnoreCase(compoundPermissionCriteria.getScopeOperator())) {
                                                        continue;
                                                    }
                                                    csCriterias.clear();
                                                    break;
                                                }
                                                String csTargetKey = cs.getTarget();
                                                TargetScopeRelatedResolver targetCsScopeRelatedResolver
                                                        = targetScopeRelatedRegistries.getTargetScopeRelatedResolver(csTargetKey);
                                                List<Object> compoundScopeData = targetCsScopeRelatedResolver.resolveRelatedTarget(cs.getData());
                                                cs.setData(compoundScopeData);
                                                csCriterias.add((Criteria) builder.apply(cs, currentUser));
                                            }
                                            compoundPermissionCriteria.setCriterias(csCriterias);
                                        }

                                        if (!CollectionUtils.isEmpty(compoundPermissionCriteria.getCriterias())) {
                                            Criteria compoundScopeCriteria = new Criteria();
                                            if (SCOPE_OPERATOR_AND.equalsIgnoreCase(compoundPermissionCriteria.getScopeOperator())) {
                                                compoundScopeCriteria = compoundScopeCriteria.andOperator(compoundPermissionCriteria.getCriterias());
                                            } else {
                                                compoundScopeCriteria = compoundScopeCriteria.orOperator(compoundPermissionCriteria.getCriterias());
                                            }
                                            criterias.add(new Criteria().orOperator(
                                                    (Criteria) builder.apply(s, currentUser),
                                                    compoundScopeCriteria
                                            ));
                                            continue;
                                        } else if (!CollectionUtils.isEmpty(s.getCompoundScopes())) {
                                            criterias.clear();
                                            continue;
                                        }

                                        criterias.add((Criteria) builder.apply(s, currentUser));
                                    }

                                    if (!criterias.isEmpty()) {
                                        pc.setCriterias(criterias);
                                        permissionCriterias.add(pc);
                                    } else if (SCOPE_OPERATOR_OR.equalsIgnoreCase(pc.getScopeOperator()) && !CollectionUtils.isEmpty(permitScopes)) {
                                        permissionCriterias.clear();
                                        break;
                                    }
                                }
                                return permissionCriterias;
                            });
                });
    }

    public List<Object> replaceDataCriteria(List<Object> data, String currentUser) {
        data = data.stream().filter(Objects::nonNull)
                .map(s -> {
                    if (s instanceof String str) {
                        if (PermissionScope.SCOPE_DATA_NULL.equalsIgnoreCase(str)) {
                            return null;
                        }
                        return PermissionScope.SCOPE_DATA_OWN.equalsIgnoreCase(str) ? currentUser : str;
                    }
                    return s;
                })
                .toList();
        return data;
    }
}
