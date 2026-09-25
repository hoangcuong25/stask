package com.fpt.framework.grpc.client.configuration;

import com.fpt.framework.grpc.GRpcHeaderContext;
import io.grpc.CallOptions;
import io.grpc.Channel;
import io.grpc.ClientCall;
import io.grpc.ClientInterceptor;
import io.grpc.ForwardingClientCall;
import io.grpc.ForwardingClientCallListener;
import io.grpc.Metadata;
import io.grpc.MethodDescriptor;
import lombok.extern.slf4j.Slf4j;



@Slf4j
public class GrpcClientInterceptor implements ClientInterceptor {

    private GRpcHeaderContext context;

    @Deprecated
    public GrpcClientInterceptor(GRpcHeaderContext context) {
        this.context = context;
    }

    public GrpcClientInterceptor() {
    }

    @Override
    public <ReqT, RespT> ClientCall<ReqT, RespT> interceptCall(MethodDescriptor<ReqT, RespT> method,
                                                               CallOptions callOptions, Channel next) {
        return new ForwardingClientCall.SimpleForwardingClientCall<ReqT, RespT>(next.newCall(method, callOptions)) {
            @Override
            public void start(Listener<RespT> responseListener, Metadata headers) {
                GRpcHeaderContext grpcContext = GRpcHeaderContext.GRPC_HEADER_CONTEXT_KEY_CONTEXT.get();
                buildHeaderGrpc(headers, grpcContext);
                buildHeaderGrpc(headers, context);
                super.start(new ForwardingClientCallListener.SimpleForwardingClientCallListener<RespT>(responseListener) {
                    @Override
                    public void onMessage(RespT message) {
                        super.onMessage(message);
                    }
                }, headers);
            }

            @Override
            public void sendMessage(ReqT message) {
                super.sendMessage(message);
            }

        };
    }

    private static void buildHeaderGrpc(Metadata headers, GRpcHeaderContext grpcContext) {
        if (grpcContext != null) {
            if (grpcContext.getTenant() != null) {
                headers.put(GRpcHeaderContext.TENANT_HEADER_KEY, grpcContext.getTenant());
            }
            if (grpcContext.getUniqueName() != null) {
                headers.put(GRpcHeaderContext.UNIQUE_NAME_HEADER_KEY, grpcContext.getUniqueName());
            }
            if (grpcContext.getRequestId() != null) {
                headers.put(GRpcHeaderContext.REQUEST_ID_HEADER_KEY, grpcContext.getRequestId());
            }
            log.trace("send message GRpc with header: {}", grpcContext);
        }
    }


}
