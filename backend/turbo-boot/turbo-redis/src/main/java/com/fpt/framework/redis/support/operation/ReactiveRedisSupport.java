package com.fpt.framework.redis.support.operation;

import reactor.core.publisher.Mono;

import java.time.Duration;

public interface ReactiveRedisSupport {

	<V> RedisValue<V> value(String key, Class<V> type);

	<V> Mono<V> get(String key, Class<V> type);

	Mono<Boolean> delete(String key, Class<?> type);

	Mono<Boolean> delete(String key);

	Mono<Boolean> exists(String key, Class<?> type);

	Mono<Boolean> exists(String key);

	Mono<Boolean> expire(String key, Class<?> type, Duration ttl);

	Mono<Boolean> expire(String key, Duration ttl);

	Mono<Long> getAtomicLong(String key);

	Mono<Long> increment(String key);

	Mono<Long> incrementBy(String key, long delta);

	Mono<Long> decrement(String key);

	Mono<Long> getAndSet(String key, long value);

	Mono<Long> decrementIfPositive(String key);

}
