package com.fpt.framework.redis.support.operation.impl;

import com.fpt.framework.redis.support.factory.ReactiveRedisFactory;
import com.fpt.framework.redis.support.operation.RedisValue;
import org.redisson.api.RBucketReactive;
import org.redisson.api.RObjectReactive;
import reactor.core.publisher.Mono;

import java.time.Duration;

public class RedisValueImpl<V> implements RedisValue<V> {

	private final ReactiveRedisFactory factory;
	private final String key;
	private final Class<V> type;

	public RedisValueImpl(ReactiveRedisFactory factory, String key, Class<V> type) {
		this.factory = factory;
		this.key = key;
		this.type = type;
	}

	private Mono<RBucketReactive<V>> bucket() {
		return factory.getBucket(key, type);
	}

	@Override
	public Mono<V> get() {
		return bucket().flatMap(RBucketReactive::get);
	}

	@Override
	public Mono<Void> set(V value) {
		return bucket().flatMap(bucket -> bucket.set(value));
	}

	@Override
	public Mono<Void> set(V value, Duration ttl) {
		if (ttl == null || ttl.isZero() || ttl.isNegative()) {
			return set(value);
		}
		return bucket().flatMap(bucket -> bucket.set(value, ttl));
	}

	@Override
	public Mono<Boolean> delete() {
		return bucket().flatMap(RObjectReactive::delete);
	}

	@Override
	public Mono<Boolean> exists() {
		return bucket().flatMap(RObjectReactive::isExists);
	}

	@Override
	public Mono<Boolean> expire(Duration ttl) {
		return bucket().flatMap(bucket -> bucket.expire(ttl));
	}
}
