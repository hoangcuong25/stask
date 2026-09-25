package com.fpt.framework.redis.support.operation.impl;

import com.fpt.framework.redis.support.factory.ReactiveRedisFactory;
import com.fpt.framework.redis.support.operation.ReactiveRedisSupport;
import com.fpt.framework.redis.support.operation.RedisValue;
import org.redisson.api.RAtomicLongReactive;
import org.redisson.api.RBucketReactive;
import org.redisson.api.RObjectReactive;
import reactor.core.publisher.Mono;

import java.time.Duration;

public class ReactiveRedisSupportImpl implements ReactiveRedisSupport {

	private final ReactiveRedisFactory factory;

	public ReactiveRedisSupportImpl(ReactiveRedisFactory factory) {
		this.factory = factory;
	}

	@Override
	public <V> RedisValue<V> value(String key, Class<V> type) {
		return new RedisValueImpl<>(factory, key, type);
	}

	@Override
	public <V> Mono<V> get(String key, Class<V> type) {
		return factory.getBucket(key, type).flatMap(RBucketReactive::get);
	}

	@Override
	public Mono<Boolean> delete(String key, Class<?> type) {
		return factory.getBucket(key, type).flatMap(RObjectReactive::delete);
	}

	@Override
	public Mono<Boolean> delete(String key) {
		return delete(key, Object.class);
	}

	@Override
	public Mono<Boolean> exists(String key, Class<?> type) {
		return factory.getBucket(key, type).flatMap(RObjectReactive::isExists);
	}

	@Override
	public Mono<Boolean> exists(String key) {
		return exists(key, Object.class);
	}

	@Override
	public Mono<Boolean> expire(String key, Class<?> type, Duration ttl) {
		return factory.getBucket(key, type).flatMap(bucket -> bucket.expire(ttl));
	}

	@Override
	public Mono<Boolean> expire(String key, Duration ttl) {
		return expire(key, Object.class, ttl);
	}

	@Override
	public Mono<Long> getAtomicLong(String key) {
		return factory.getAtomicLong(key).flatMap(RAtomicLongReactive::get);
	}

	@Override
	public Mono<Long> increment(String key) {
		return factory.getAtomicLong(key).flatMap(RAtomicLongReactive::incrementAndGet);
	}

	@Override
	public Mono<Long> incrementBy(String key, long delta) {
		return factory.getAtomicLong(key).flatMap(atomic -> atomic.addAndGet(delta));
	}

	@Override
	public Mono<Long> decrement(String key) {
		return factory.getAtomicLong(key).flatMap(RAtomicLongReactive::decrementAndGet);
	}

	@Override
	public Mono<Long> getAndSet(String key, long value) {
		return factory.getAtomicLong(key).flatMap(atomic -> atomic.getAndSet(value));
	}

	@Override
	public Mono<Long> decrementIfPositive(String key) {
		return factory.getAtomicLong(key)
				.flatMap(this::decrementIfPositive);
	}

	private Mono<Long> decrementIfPositive(RAtomicLongReactive atomicLong) {
		return Mono.defer(() -> atomicLong.get()
				.flatMap(current -> {
					if (current <= 0) {
						return Mono.just(0L);
					}

					long next = current - 1;
					return atomicLong.compareAndSet(current, next)
							.flatMap(updated -> updated
									? Mono.just(next)
									: decrementIfPositive(atomicLong));
				}));
	}
}
