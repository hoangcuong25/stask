package com.fpt.framework.redis.support.operation;

import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Collection;
import java.util.Map;

public interface ReactiveRedisBatch {

	<V> Mono<Map<String, V>> multiGet(Class<V> type, Collection<String> rawKeys);

	<V> Mono<Void> multiSet(Class<V> type, Map<String, V> values, Duration ttl);

	Mono<Long> delete(Collection<String> rawKeys);
}
