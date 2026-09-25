package com.fpt.framework.redis.support.factory.impl;

import com.fpt.framework.redis.support.codec.CodecRegistry;
import com.fpt.framework.redis.support.factory.ReactiveRedisFactory;
import com.fpt.framework.redis.support.key.RedisKeyBuilder;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RAtomicDoubleReactive;
import org.redisson.api.RAtomicLongReactive;
import org.redisson.api.RBitSetReactive;
import org.redisson.api.RBlockingQueueReactive;
import org.redisson.api.RBucketReactive;
import org.redisson.api.RDequeReactive;
import org.redisson.api.RHyperLogLogReactive;
import org.redisson.api.RListReactive;
import org.redisson.api.RLockReactive;
import org.redisson.api.RMapCacheReactive;
import org.redisson.api.RMapReactive;
import org.redisson.api.RQueueReactive;
import org.redisson.api.RScoredSortedSetReactive;
import org.redisson.api.RSetReactive;
import org.redisson.api.RStreamReactive;
import org.redisson.api.RTopicReactive;
import org.redisson.api.RedissonReactiveClient;
import org.redisson.client.codec.StringCodec;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Component
@Slf4j
public class ReactiveRedisFactoryImpl implements ReactiveRedisFactory {

	private final RedissonReactiveClient reactiveClient;
	private final RedisKeyBuilder keyBuilder;
	private final CodecRegistry codecRegistry;

	public ReactiveRedisFactoryImpl(RedissonReactiveClient reactiveClient, RedisKeyBuilder keyBuilder, CodecRegistry codecRegistry) {
		this.reactiveClient = reactiveClient;
		this.keyBuilder = keyBuilder;
		this.codecRegistry = codecRegistry;
	}

	private static boolean shouldApplyTtl(Duration ttl) {
		return ttl != null && !ttl.isZero() && !ttl.isNegative();
	}

	@Override
	public <K, V> Mono<RMapReactive<K, V>> getMap(String key, Class<V> vt) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getMap key={} valueType={}", cacheKey, vt.getSimpleName());
					return reactiveClient.getMap(cacheKey, codecRegistry.obtainCodec(Object.class, vt));
				});
	}

	@Override
	public <K, V> Mono<RMapCacheReactive<K, V>> getMapCache(String key, Class<V> vt, Duration ttl) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.flatMap(cacheKey -> {
					RMapCacheReactive<K, V> cache = reactiveClient.getMapCache(cacheKey, codecRegistry.obtainCodec(Object.class, vt));
					if (shouldApplyTtl(ttl)) {
						return cache.expire(ttl)
								.doOnNext(applied -> log.debug("[RedisFactory] expire(MapCache) key={} ttl={} applied={}", cacheKey, ttl, applied))
								.thenReturn(cache);
					} else {
						return Mono.just(cache);
					}
				});
	}

	@Override
	public <V> Mono<RBucketReactive<V>> getBucket(String key, Class<V> vt, Duration ttl) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.flatMap(cacheKey -> {
					RBucketReactive<V> bucket = reactiveClient.getBucket(cacheKey, codecRegistry.obtainCodec(vt));
					if (shouldApplyTtl(ttl)) {
						return bucket.expire(ttl)
								.doOnNext(applied -> log.debug("[RedisFactory] expire(Bucket) key={} ttl={} applied={}", cacheKey, ttl, applied))
								.thenReturn(bucket);
					} else {
						return Mono.just(bucket);
					}
				});
	}

	@Override
	public <E> Mono<RSetReactive<E>> getSet(String key, Class<E> et) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getSet key={} elementType={}", cacheKey, et.getSimpleName());
					return reactiveClient.getSet(cacheKey, codecRegistry.obtainCodec(et));
				});
	}

	@Override
	public <E> Mono<RQueueReactive<E>> getQueue(String key, Class<E> et) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getQueue key={} elementType={}", cacheKey, et.getSimpleName());
					return reactiveClient.getQueue(cacheKey, codecRegistry.obtainCodec(et));
				});
	}

	@Override
	public Mono<RLockReactive> getLock(String key) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getLock key={}", cacheKey);
					return reactiveClient.getLock(cacheKey);
				});
	}

	@Override
	public Mono<RTopicReactive> getTopic(String key) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getTopic key={}", cacheKey);
					return reactiveClient.getTopic(cacheKey, StringCodec.INSTANCE);
				});
	}

	@Override
	public <K, V> Mono<RStreamReactive<K, V>> getStream(String key, Class<K> keyType, Class<V> valueType) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getStream key={} keyType={} valueType={}", cacheKey, keyType.getSimpleName(), valueType.getSimpleName());
					return reactiveClient.getStream(cacheKey, codecRegistry.obtainCodec(keyType, valueType));
				});
	}

	@Override
	public <K, V> Mono<RMapReactive<K, V>> getMap(String key, Class<K> keyType, Class<V> valueType) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getMap key={} keyType={} valueType={}", cacheKey, keyType.getSimpleName(), valueType.getSimpleName());
					return reactiveClient.getMap(cacheKey, codecRegistry.obtainCodec(keyType, valueType));
				});
	}

	@Override
	public <K, V> Mono<RMapCacheReactive<K, V>> getMapCache(String key, Class<K> keyType, Class<V> valueType, Duration ttl) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.flatMap(cacheKey -> {
					RMapCacheReactive<K, V> cache = reactiveClient.getMapCache(cacheKey, codecRegistry.obtainCodec(keyType, valueType));
					if (shouldApplyTtl(ttl)) {
						return cache.expire(ttl)
								.doOnNext(applied -> log.debug("[RedisFactory] expire(MapCache) key={} ttl={} applied={}", cacheKey, ttl, applied))
								.thenReturn(cache);
					}
					return Mono.just(cache);
				});
	}

	@Override
	public <V> Mono<RBucketReactive<V>> getBucket(String key, Class<V> valueType) {
		return getBucket(key, valueType, null);
	}

	@Override
	public <E> Mono<RListReactive<E>> getList(String key, Class<E> elementType) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getList key={} elementType={}", cacheKey, elementType.getSimpleName());
					return reactiveClient.getList(cacheKey, codecRegistry.obtainCodec(elementType));
				});
	}

	@Override
	public <E> Mono<RDequeReactive<E>> getDeque(String key, Class<E> elementType) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getDeque key={} elementType={}", cacheKey, elementType.getSimpleName());
					return reactiveClient.getDeque(cacheKey, codecRegistry.obtainCodec(elementType));
				});
	}

	@Override
	public <E> Mono<RBlockingQueueReactive<E>> getBlockingQueue(String key, Class<E> elementType) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getBlockingQueue key={} elementType={}", cacheKey, elementType.getSimpleName());
					return reactiveClient.getBlockingQueue(cacheKey, codecRegistry.obtainCodec(elementType));
				});
	}

	@Override
	public <E> Mono<RScoredSortedSetReactive<E>> getScoredSortedSet(String key, Class<E> elementType) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getScoredSortedSet key={} elementType={}", cacheKey, elementType.getSimpleName());
					return reactiveClient.getScoredSortedSet(cacheKey, codecRegistry.obtainCodec(elementType));
				});
	}

	@Override
	public Mono<RAtomicLongReactive> getAtomicLong(String key) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getAtomicLong key={}", cacheKey);
					return reactiveClient.getAtomicLong(cacheKey);
				});
	}

	@Override
	public Mono<RAtomicDoubleReactive> getAtomicDouble(String key) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getAtomicDouble key={}", cacheKey);
					return reactiveClient.getAtomicDouble(cacheKey);
				});
	}

	@Override
	public Mono<RBitSetReactive> getBitSet(String key) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getBitSet key={}", cacheKey);
					return reactiveClient.getBitSet(cacheKey);
				});
	}

	@Override
	public <V> Mono<RHyperLogLogReactive<V>> getHyperLogLog(String key, Class<V> elementType) {
		return keyBuilder.build(key)
				.switchIfEmpty(Mono.just(key))
				.map(cacheKey -> {
					log.trace("[RedisFactory] getHyperLogLog key={} elementType={}", cacheKey, elementType.getSimpleName());
					return reactiveClient.getHyperLogLog(cacheKey, codecRegistry.obtainCodec(elementType));
				});
	}
}
