package com.fpt.framework.grpc;


import io.grpc.Context;
import io.grpc.Metadata;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Getter
@Data
public class GRpcHeaderContext {

        public static final Context.Key<GRpcHeaderContext> GRPC_HEADER_CONTEXT_KEY_CONTEXT = Context.key("GRPC_HEADER_CONTEXT");

        public static final String TENANT_KEY = "Tenant-Id";
        public static final String UNIQUE_NAME_KEY = "Unique-Name";
        public static final String REQUEST_ID_KEY = "Request-Id";

        public static final Metadata.Key<String> TENANT_HEADER_KEY =
                Metadata.Key.of(TENANT_KEY, Metadata.ASCII_STRING_MARSHALLER);

        public static final Metadata.Key<String> UNIQUE_NAME_HEADER_KEY =
                Metadata.Key.of(UNIQUE_NAME_KEY, Metadata.ASCII_STRING_MARSHALLER);

        public static final Metadata.Key<String> REQUEST_ID_HEADER_KEY =
                Metadata.Key.of(REQUEST_ID_KEY, Metadata.ASCII_STRING_MARSHALLER);

        private String tenant;
        private String uniqueName;
        private String requestId;
}
