package com.fpt.framework.security.support;

import com.fpt.framework.security.model.PermissionPolicy;
import com.fpt.framework.security.model.PermissionScope;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Log4j2
public class AuthorizationSecurity {

    private final Flux<PermissionPolicy> policies;

    public AuthorizationSecurity(Flux<PermissionPolicy> policies) {
        this.policies = policies;
    }

    public Mono<Boolean> hasPermission(String resource, String action) {
        return policies.filter(p ->
                p.hasPermit(resource, action)).hasElements().doOnNext(permit -> {
            log.trace("Check permission of resource {}, action: {}, permit: {}", resource, action, permit);
        });
    }
    public Mono<List<PermissionScope>> getPermissionScopes(String resource, String action) {
        return policies.filter(p ->
                p.hasPermit(resource, action)).flatMap(p -> Flux.fromIterable(p.getScopes())).collectList();
    }

    public Mono<Boolean> hasPermission(String resource, String action, String data) {
        return policies.filter(p ->
                p.hasPermit(resource, action, data)).hasElements()
                .doOnNext(permit ->
                        log.trace("Check permission of resource {}, action: {}, data: {}, permit: {}",
                                resource, action, data, permit));
    }

    public Mono<Boolean> hasPermission(String resource, String action, String targetKey, String targetValue) {
        return policies.filter(p ->
                p.hasPermit(resource, action, targetKey, targetValue)).hasElements().doOnNext(permit -> {
            log.trace("Check permission of resource {}, action: {}, targetKey: {}, targetValue: {}, permit: {}",
                    resource, action, targetKey, targetValue, permit);
        });
    }
}
