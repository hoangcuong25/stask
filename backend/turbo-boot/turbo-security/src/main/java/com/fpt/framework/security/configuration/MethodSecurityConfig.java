package com.fpt.framework.security.configuration;

import com.fpt.framework.security.support.AuthorizationManagerBeforeReactiveMethodInterceptor;
import com.fpt.framework.security.support.AuthorizationManagerBetweenReactiveMethodInterceptor;
import com.fpt.framework.security.support.AuthorizationService;
import com.fpt.framework.security.support.PermissionResolver;
import com.fpt.framework.security.support.RestPermissionResolver;
import org.springframework.aop.Advisor;
import org.springframework.aop.config.AopConfigUtils;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Role;

@Configuration
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
public class MethodSecurityConfig {


    @Bean
    @ConditionalOnMissingBean
    @Lazy
    public PermissionResolver permissionResolver() {
        return new RestPermissionResolver();
    }

    @Bean("author")
    @ConditionalOnBean(PermissionResolver.class)
    public AuthorizationService author() {
        return new AuthorizationService();
    }

    @Bean
    @ConditionalOnMissingBean
    BeanDefinitionRegistryPostProcessor aopConfig() {
        return AopConfigUtils::registerAutoProxyCreatorIfNecessary;
    }

    @Bean
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    Advisor preAuthorize() {
        return AuthorizationManagerBeforeReactiveMethodInterceptor.preAuthorize();
    }

    @Bean
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    Advisor betweenAuthorize() {
        return AuthorizationManagerBetweenReactiveMethodInterceptor.betweenAuthorize();
    }
}