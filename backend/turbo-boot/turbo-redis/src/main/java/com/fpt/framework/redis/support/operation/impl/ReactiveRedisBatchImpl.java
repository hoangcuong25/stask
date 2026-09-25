package com.fpt.framework.redis.support.operation.impl;

import com.fpt.framework.redis.support.codec.CodecRegistry;
import com.fpt.framework.redis.support.key.RedisKeyBuilder;
import com.fpt.framework.redis.support.operation.ReactiveRedisBatch;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RBatchReactive;
import org.redisson.api.RedissonReactiveClient;
import org.redisson.client.codec.Codec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
public class ReactiveRedisBatchImpl implements ReactiveRedisBatch {

	private final RedissonReactiveClient reactiveClient;
	private final RedisKeyBuilder keyBuilder;
	private final CodecRegistry codecRegistry;

	public ReactiveRedisBatchImpl(RedissonReactiveClient reactiveClient,
	                              RedisKeyBuilder keyBuilder,
	                              CodecRegistry codecRegistry) {
		this.reactiveClient = reactiveClient;
		this.keyBuilder = keyBuilder;
		this.codecRegistry = codecRegistry;
	}

	private Mono<Map<String, String>> resolveKeys(Collection<String> rawKeys) {
		return Flux.fromIterable(rawKeys)
				.distinct()
				.concatMap(raw -> keyBuilder.build(raw)
						.switchIfEmpty(Mono.just(raw))
						.map(full -> Map.entry(raw, full)))
				.collectMap(Map.Entry::getKey, Map.Entry::getValue, LinkedHashMap::new);
	}

	@Override
	public <V> Mono<Map<String, V>> multiGet(Class<V> type, Collection<String> rawKeys) {
		if (rawKeys == null || rawKeys.isEmpty()) {
			return Mono.just(Map.of());
		}
		Codec codec = codecRegistry.obtainCodec(type);
		return resolveKeys(rawKeys)
				.flatMap(rawToFull -> reactiveClient.getBuckets(codec)
						.<V>get(rawToFull.values().toArray(String[]::new))
						.map(byFullKey -> toRawKeyed(rawToFull, byFullKey))
						.defaultIfEmpty(Map.of()));
	}

	private <V> Map<String, V> toRawKeyed(Map<String, String> rawToFull, Map<String, V> byFullKey) {
		if (byFullKey == null || byFullKey.isEmpty()) {
			return Map.of();
		}
		Map<String, V> result = new HashMap<>((int) (byFullKey.size() / 0.75f) + 1);
		rawToFull.forEach((raw, full) -> {
			V hit = byFullKey.get(full);
			if (hit != null) {
				result.put(raw, hit);
			}
		});
		return result;
	}

	@Override
	public <V> Mono<Void> multiSet(Class<V> type, Map<String, V> values, Duration ttl) {
		if (values == null || values.isEmpty()) {
			return Mono.empty();
		}
		Codec codec = codecRegistry.obtainCodec(type);
		boolean withTtl = ttl != null && !ttl.isZero() && !ttl.isNegative();

		return resolveKeys(values.keySet())
				.flatMap(rawToFull -> {
					RBatchReactive batch = reactiveClient.createBatch();
					rawToFull.forEach((raw, full) -> {
						V value = values.get(raw);
						if (value == null) {
							return;
						}
						if (withTtl) {
							batch.<V>getBucket(full, codec).set(value, ttl);
						} else {
							batch.<V>getBucket(full, codec).set(value);
						}
					});
					return batch.execute().then();
				});
	}

	@Override
	public Mono<Long> delete(Collection<String> rawKeys) {
		if (rawKeys == null || rawKeys.isEmpty()) {
			return Mono.just(0L);
		}
		return resolveKeys(rawKeys)
				.flatMap(rawToFull -> reactiveClient.getKeys()
						.delete(rawToFull.values().toArray(String[]::new)));
	}
}
