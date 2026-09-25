package com.fpt.framework.grpc.client.configuration;

import com.fpt.framework.grpc.client.support.ReactiveGrpcMethodInterceptor;
import net.devh.boot.grpc.client.interceptor.GrpcGlobalClientInterceptor;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;

@Configuration
public class GrpcClientAutoConfiguration {

    @GrpcGlobalClientInterceptor
    public GrpcClientInterceptor grpcClientInterceptor() {
        return new GrpcClientInterceptor();
    }

    @Bean
    @ConditionalOnBean(ClientReactiveInterceptor.class)
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    ReactiveGrpcMethodInterceptor reactiveGrpcMethodInterceptor() {
        return new ReactiveGrpcMethodInterceptor();
    }
}
