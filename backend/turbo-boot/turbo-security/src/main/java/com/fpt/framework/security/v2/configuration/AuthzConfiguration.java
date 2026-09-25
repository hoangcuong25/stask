package com.fpt.framework.security.v2.configuration;

import com.fpt.framework.security.v2.support.PermissionQueryResolver;
import com.fpt.framework.security.v2.support.PermissionV2Resolver;
import com.fpt.framework.security.v2.support.AuthzMethodInterceptor;
import com.fpt.framework.security.v2.support.AuthorizationV2Service;
import com.fpt.framework.security.v2.support.DefaultPermissionV2Resolver;
import com.fpt.framework.security.v2.support.EmptyPermissionQueryResolver;
import com.fpt.framework.security.v2.support.data.ReactivePermissionV2Query;
import com.fpt.framework.utility.ReactiveApplication;
import org.springframework.aop.Advisor;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Role;

@Configuration
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
public class AuthzConfiguration {
	@Bean
	@Role(BeanDefinition.ROLE_INFRASTRUCTURE)
	Advisor checkPermission() {
		return AuthzMethodInterceptor.checkPermission();
	}

	@Bean("authorizationV2Service")
	@ConditionalOnBean(PermissionV2Resolver.class)
	public AuthorizationV2Service authorizationV2Service() {
		return new AuthorizationV2Service();
	}

	@Bean
	@ConditionalOnMissingBean
	@Lazy
	public PermissionV2Resolver defaultAuthzClient() {
		return new DefaultPermissionV2Resolver();
	}

	@Bean
	@ConditionalOnMissingBean
	public PermissionQueryResolver defaultQueryFilterResolver() {
		return new EmptyPermissionQueryResolver();
	}

	@Bean
	@ConditionalOnMissingBean
	public ReactivePermissionV2Query queryAuthorizationService(PermissionQueryResolver permissionQueryResolver, ReactiveApplication reactiveApplication) {
		return new ReactivePermissionV2Query(permissionQueryResolver, reactiveApplication);
	}
}
