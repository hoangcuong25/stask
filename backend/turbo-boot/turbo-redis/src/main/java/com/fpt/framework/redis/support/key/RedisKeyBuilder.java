package com.fpt.framework.redis.support.key;

import reactor.core.publisher.Mono;

public interface RedisKeyBuilder {
	Mono<String> build(String rawKey);
}

