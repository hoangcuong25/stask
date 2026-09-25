package com.fpt.framework.redis.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.framework.redis.support.codec.CodecRegistry;
import com.fpt.framework.redis.support.codec.DefaultCodecRegistry;
import com.fpt.framework.redis.support.codec.RedisCodecProvider;
import com.fpt.framework.redis.support.factory.ReactiveRedisFactory;
import com.fpt.framework.redis.support.factory.impl.ReactiveRedisFactoryImpl;
import com.fpt.framework.redis.support.key.DefaultKeyBuilder;
import com.fpt.framework.redis.support.key.RedisKeyBuilder;
import com.fpt.framework.redis.support.operation.ReactiveRedisBatch;
import com.fpt.framework.redis.support.operation.ReactiveRedisSupport;
import com.fpt.framework.redis.support.operation.impl.ReactiveRedisBatchImpl;
import com.fpt.framework.redis.support.operation.impl.ReactiveRedisSupportImpl;
import org.redisson.Redisson;
import org.redisson.api.RedissonReactiveClient;
import org.redisson.spring.starter.RedissonAutoConfiguration;
import org.redisson.spring.starter.RedissonProperties;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisOperations;

@Configuration
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.REACTIVE)
@AutoConfiguration(
		before = {org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration.class}
)
@ConditionalOnClass({Redisson.class, RedisOperations.class})
@ConditionalOnProperty(prefix = "turbo.redis", name = "enabled", havingValue = "true")
@EnableConfigurationProperties({RedissonProperties.class, RedisProperties.class})
public class RedisAutoConfiguration extends RedissonAutoConfiguration {

	@Bean
	@ConditionalOnMissingBean(RedisKeyBuilder.class)
	public RedisKeyBuilder redisKeyBuilder() {
		return new DefaultKeyBuilder();
	}

	@Bean
	@ConditionalOnMissingBean(CodecRegistry.class)
	public CodecRegistry codecRegistry(ObjectProvider<ObjectMapper> objectMapperProvider,
	                                   ObjectProvider<RedisCodecProvider> codecProviders) {
		ObjectMapper objectMapper = objectMapperProvider.getIfAvailable(ObjectMapper::new);
		return new DefaultCodecRegistry(objectMapper, codecProviders.orderedStream().toList());
	}

	@Bean
	@ConditionalOnMissingBean(ReactiveRedisBatch.class)
	public ReactiveRedisBatch reactiveRedisBatch(RedissonReactiveClient reactiveClient,
	                                             RedisKeyBuilder redisKeyBuilder,
	                                             CodecRegistry codecRegistry) {
		return new ReactiveRedisBatchImpl(reactiveClient, redisKeyBuilder, codecRegistry);
	}

	@Bean
	@ConditionalOnMissingBean(ReactiveRedisFactory.class)
	public ReactiveRedisFactory reactiveRedisFactory(RedissonReactiveClient reactiveClient,
	                                                 RedisKeyBuilder redisKeyBuilder,
	                                                 CodecRegistry codecRegistry) {
		return new ReactiveRedisFactoryImpl(reactiveClient, redisKeyBuilder, codecRegistry);
	}

	@Bean
	@ConditionalOnMissingBean(ReactiveRedisSupport.class)
	public ReactiveRedisSupport reactiveRedisOperations(ReactiveRedisFactory reactiveRedisFactory) {
		return new ReactiveRedisSupportImpl(reactiveRedisFactory);
	}
}
