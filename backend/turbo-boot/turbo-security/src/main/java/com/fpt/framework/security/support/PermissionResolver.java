package com.fpt.framework.security.support;

import com.fpt.framework.security.model.PermissionPolicy;
import reactor.core.publisher.Flux;

import java.util.List;

public interface PermissionResolver {
    public Flux<PermissionPolicy> readPermissions(String application);
}
