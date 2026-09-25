package com.fpt.framework.redis.support.operation;

import reactor.core.publisher.Mono;

import java.time.Duration;

public interface RedisValue<V> {

	Mono<V> get();

	Mono<Void> set(V value);

	Mono<Void> set(V value, Duration ttl);

	Mono<Boolean> delete();

	Mono<Boolean> exists();

	Mono<Boolean> expire(Duration ttl);
}
