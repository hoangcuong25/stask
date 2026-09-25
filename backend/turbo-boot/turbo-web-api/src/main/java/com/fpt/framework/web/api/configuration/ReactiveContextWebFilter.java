package com.fpt.framework.web.api.configuration;

import com.fpt.framework.data.support.TenantContext;
import com.fpt.framework.web.api.support.RequestContext;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;


public class ReactiveContextWebFilter implements WebFilter {

    public static final String TENANT_HEADER_KEY = TenantContext.TENANT_ID_CONTEXT_KEY;
    public static final String REQUEST_HEADER_KEY = RequestContext.REQUEST_CONTEXT_KEY;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        var request = exchange.getRequest();
        var tenantIdHeader = request.getHeaders().getOrEmpty(TENANT_HEADER_KEY);
        var requestHeader = request.getHeaders().getOrEmpty(REQUEST_HEADER_KEY);
        if (tenantIdHeader.size() == 0) {
            // TODO: add config multi-tenant to detect request
            return chain.filter(exchange);
        }
        return chain.filter(exchange).contextWrite(context
                -> {
            var tenantId = tenantIdHeader.get(0);
            var requestId = request.getId();
            if (requestHeader.size() > 0) {
                requestId = requestHeader.get(0);
            }
            TenantContext.Tenant tenant = new TenantContext.Tenant();
            tenant.setId(tenantId);
            context = TenantContext.setCurrentTenant(tenant, context);
            context = RequestContext.setCurrentRequest(
                    RequestContext.Request.builder().id(requestId).build(), context);

            return context;
        });
    }
}