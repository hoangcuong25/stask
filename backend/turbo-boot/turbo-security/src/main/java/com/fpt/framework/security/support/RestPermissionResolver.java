package com.fpt.framework.security.support;

import com.fpt.framework.security.model.PermissionPolicy;
import com.fpt.framework.security.model.PermissionScope;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

public class RestPermissionResolver implements  PermissionResolver {
    @Override
    public Flux<PermissionPolicy> readPermissions(String application) {
        return Flux.empty();
    }
}
