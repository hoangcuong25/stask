package com.fpt.framework.redis.support.codec;

import org.redisson.client.codec.Codec;

public interface CodecRegistry {
	<T> Codec obtainCodec(Class<T> type);

	<K, V> Codec obtainCodec(Class<K> keyType, Class<V> valueType);
}
