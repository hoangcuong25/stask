package com.fpt.framework.security.v2.configuration;

import com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationQueryBuilder;
import com.fpt.framework.security.v2.support.PermissionQueryResolver;
import com.fpt.framework.security.v2.support.data.ReactivePermissionV2Query;
import com.fpt.framework.security.v2.support.data.ReactiveQueryBuilder;
import com.fpt.framework.utility.ReactiveApplication;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnClass(name = "com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationRepositoryFactoryBean")
@Slf4j
public class DataSecuritySupport {
	@Bean
	@ConditionalOnBean({PermissionQueryResolver.class, ReactiveApplication.class})
	public ReactiveNoneRelationQueryBuilder reactiveQueryBuilder(ReactivePermissionV2Query reactivePermissionV2Query) {
		return new ReactiveQueryBuilder(reactivePermissionV2Query);
	}
}
