package com.fpt.framework.data.support;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;
import reactor.util.context.ContextView;

public class TenantContext {
    public static final String TENANT_ID_CONTEXT_KEY = "Tenant-Id";
    public static Mono<Tenant> currentTenant() {
//       return Mono
//                .deferContextual(Mono::just)
//                .filter(ct -> ct.hasKey(TENANT_ID_CONTEXT_KEY)).map(ct -> currentTenant(ct)).cast(Tenant.class);
        return Mono.just(new Tenant("fpt-spro", "fpt-spro"));
    }
    public static Tenant currentTenant(ContextView context) {
        if (!context.hasKey(TENANT_ID_CONTEXT_KEY)) {
            return Tenant.builder().id("-").build();
        }
        return context.get(TENANT_ID_CONTEXT_KEY);
    }

    public static Context setCurrentTenant(Tenant tenant, Context context) {
        return context.put(TENANT_ID_CONTEXT_KEY, tenant);
    }
    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Tenant {
        private String name;
        private String id;

    }
}
