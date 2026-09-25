package com.fpt.framework.grpc.client.configuration;

import com.fpt.framework.grpc.GRpcHeaderContext;
import reactor.core.publisher.Mono;

public interface ClientReactiveInterceptor {

    Mono<GRpcHeaderContext> buildHeaderContext();
}
