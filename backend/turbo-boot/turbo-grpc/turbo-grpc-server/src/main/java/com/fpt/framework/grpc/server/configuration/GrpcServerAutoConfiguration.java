package com.fpt.framework.grpc.server.configuration;

import com.fpt.framework.grpc.server.suport.GrpcServerReactiveMethodInterceptor;
import net.devh.boot.grpc.server.interceptor.GrpcGlobalServerInterceptor;
import org.springframework.aop.Advisor;
import org.springframework.aop.config.AopConfigUtils;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Role;

@Configuration
@Import(GrpcApiAdvice.class)
public class GrpcServerAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    @GrpcGlobalServerInterceptor
    public ServerReactiveInterceptor grpcServerInterceptor() {
        return new GrpcServerInterceptor();
    }

    @Bean
    @ConditionalOnMissingBean
    BeanDefinitionRegistryPostProcessor aopConfig() {
        return AopConfigUtils::registerAutoProxyCreatorIfNecessary;
    }

    @Bean
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    @ConditionalOnBean(ServerReactiveInterceptor.class)
    Advisor grpcInterceptor(ServerReactiveInterceptor serverReactiveInterceptor) {
        return new GrpcServerReactiveMethodInterceptor(serverReactiveInterceptor);
    }
}
