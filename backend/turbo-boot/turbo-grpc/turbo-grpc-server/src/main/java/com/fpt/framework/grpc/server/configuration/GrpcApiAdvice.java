package com.fpt.framework.grpc.server.configuration;

import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import net.devh.boot.grpc.server.advice.GrpcAdvice;
import net.devh.boot.grpc.server.advice.GrpcExceptionHandler;

@GrpcAdvice
public class GrpcApiAdvice {

    @GrpcExceptionHandler(IllegalArgumentException.class)
    public StatusRuntimeException handleInvalidArgument(IllegalArgumentException e) {
        Status status = Status.INVALID_ARGUMENT.withDescription(e.getMessage()).withCause(e);
        return status.asRuntimeException();
    }

    @GrpcExceptionHandler(Exception.class)
    public StatusRuntimeException handleInternalServer(Exception e) {
        Status status = Status.INTERNAL.withDescription("Internal server error").withCause(e);
        return status.asRuntimeException();
    }
}
