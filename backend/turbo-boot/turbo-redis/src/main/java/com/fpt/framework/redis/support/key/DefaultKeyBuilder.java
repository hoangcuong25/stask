package com.fpt.framework.redis.support.key;

import reactor.core.publisher.Mono;

public class DefaultKeyBuilder implements RedisKeyBuilder {
	@Override
	public Mono<String> build(String rawKey) {
		return Mono.just(rawKey == null ? "" : rawKey.trim());
	}
}