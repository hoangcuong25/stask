package com.fpt.framework.security.support;

import com.fpt.framework.security.model.PermissionPolicy;
import com.fpt.framework.security.model.PermissionScope;
import com.fpt.framework.utility.ReactiveApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public class AuthorizationService {

    @Autowired
    @Lazy
    private PermissionResolver permissionResolver;

    @Autowired
    @Lazy
    private ReactiveApplication reactiveApplication;


    public Mono<Boolean> hasPermission(String resource, String action, String id) {
        AuthorizationSecurity security = new AuthorizationSecurity(readPermissions());
        return security.hasPermission(resource, action, id);
    }

    public Mono<Boolean> hasPermission(String resource, String action) {
        AuthorizationSecurity security = new AuthorizationSecurity(readPermissions());
        return security.hasPermission(resource, action);
    }

    public Mono<Boolean> hasPermission(String resource, String action, String targetKey, String targetValue) {
        AuthorizationSecurity security = new AuthorizationSecurity(readPermissions());
        return security.hasPermission(resource, action, targetKey, targetValue);
    }

    public Flux<PermissionPolicy> readPermissions() {
        return reactiveApplication.applicationUnique()
                .flatMapMany(applicationName -> permissionResolver.readPermissions(applicationName));
    }

    public Flux<PermissionPolicy> readPermissions(String resource, String action) {
        return readPermissions().filter(p ->
                resource.equalsIgnoreCase(p.getResource())
                        && action.equalsIgnoreCase(p.getAction()));
    }
    public Mono<Boolean> hasPermission(Flux<PermissionPolicy> permissions, String resource, String action) {
        AuthorizationSecurity security = new AuthorizationSecurity(permissions);
        return security.hasPermission(resource, action);
    }
    public Mono<List<PermissionScope>> getPermissionScopes(String resource, String action) {
        AuthorizationSecurity security = new AuthorizationSecurity(readPermissions());
        return security.getPermissionScopes(resource, action);
    }
}
