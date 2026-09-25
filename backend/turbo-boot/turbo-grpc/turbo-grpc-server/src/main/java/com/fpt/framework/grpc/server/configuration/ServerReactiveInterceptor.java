package com.fpt.framework.grpc.server.configuration;

import com.fpt.framework.grpc.GRpcHeaderContext;
import io.grpc.Context;
import io.grpc.Contexts;
import io.grpc.Metadata;
import io.grpc.ServerCall;
import io.grpc.ServerCallHandler;
import io.grpc.ServerInterceptor;

public interface ServerReactiveInterceptor extends ServerInterceptor {



    public static Context.Key<String> ctxKeyTenant = Context.key(GRpcHeaderContext.TENANT_KEY);

    public static Context.Key<String> ctxKeyRequestId = Context.key(GRpcHeaderContext.REQUEST_ID_KEY);

    public static Context.Key<String> ctxKeyUniqueName = Context.key(GRpcHeaderContext.UNIQUE_NAME_KEY);

    @Override
    default  <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(ServerCall<ReqT, RespT> call, Metadata headers,
                                                                 ServerCallHandler<ReqT, RespT> next) {
        Context ctx = Context.current()
                .withValue(ctxKeyTenant, headers.get(GRpcHeaderContext.TENANT_HEADER_KEY))
                .withValue(ctxKeyRequestId, headers.get(GRpcHeaderContext.REQUEST_ID_HEADER_KEY))
                .withValue(ctxKeyUniqueName, headers.get(GRpcHeaderContext.UNIQUE_NAME_HEADER_KEY));
        return Contexts.interceptCall(ctx, call, headers, next);
    }

    default reactor.util.context.Context contextWrite(reactor.util.context.Context context) {
        return context;
    }
}
