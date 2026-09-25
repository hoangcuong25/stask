package com.fpt.framework.redis.support.factory;

import org.redisson.api.RAtomicDoubleReactive;
import org.redisson.api.RAtomicLongReactive;
import org.redisson.api.RBitSetReactive;
import org.redisson.api.RBlockingQueueReactive;
import org.redisson.api.RBucketReactive;
import org.redisson.api.RBucketsReactive;
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
import reactor.core.publisher.Mono;

import java.time.Duration;

public interface ReactiveRedisFactory {
	<K, V> Mono<RMapReactive<K, V>> getMap(String name, Class<V> valueType);

	<K, V> Mono<RMapCacheReactive<K, V>> getMapCache(String name, Class<V> valueType, Duration ttl);

	<V> Mono<RBucketReactive<V>> getBucket(String name, Class<V> valueType, Duration ttl);

	<E> Mono<RSetReactive<E>> getSet(String name, Class<E> elementType);

	<E> Mono<RQueueReactive<E>> getQueue(String name, Class<E> elementType);

	Mono<RLockReactive> getLock(String name);

	Mono<RTopicReactive> getTopic(String key);

	<K, V> Mono<RStreamReactive<K, V>> getStream(String key, Class<K> keyType, Class<V> valueType);

	<E> Mono<RListReactive<E>> getList(String name, Class<E> elementType);

	<E> Mono<RDequeReactive<E>> getDeque(String name, Class<E> elementType);

	<E> Mono<RBlockingQueueReactive<E>> getBlockingQueue(String name, Class<E> elementType);

	<E> Mono<RScoredSortedSetReactive<E>> getScoredSortedSet(String name, Class<E> elementType);

	Mono<RAtomicLongReactive> getAtomicLong(String name);

	Mono<RAtomicDoubleReactive> getAtomicDouble(String name);

	Mono<RBitSetReactive> getBitSet(String name);

	<V> Mono<RHyperLogLogReactive<V>> getHyperLogLog(String name, Class<V> elementType);

	<V> Mono<RBucketReactive<V>> getBucket(String name, Class<V> valueType);

	<K, V> Mono<RMapReactive<K, V>> getMap(String name, Class<K> keyType, Class<V> valueType);

	<K, V> Mono<RMapCacheReactive<K, V>> getMapCache(String name, Class<K> keyType, Class<V> valueType, Duration ttl);
}
