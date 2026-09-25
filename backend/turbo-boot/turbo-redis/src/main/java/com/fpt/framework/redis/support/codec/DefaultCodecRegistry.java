package com.fpt.framework.redis.support.codec;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.redisson.client.codec.Codec;
import org.redisson.client.codec.StringCodec;
import org.redisson.codec.TypedJsonJacksonCodec;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Slf4j
public class DefaultCodecRegistry implements CodecRegistry {

	private final ObjectMapper objectMapper;
	private final List<RedisCodecProvider> providers;
	private final ConcurrentMap<Object, Codec> codecMap = new ConcurrentHashMap<>();

	public DefaultCodecRegistry(ObjectMapper objectMapper) {
		this(objectMapper, List.of());
	}

	public DefaultCodecRegistry(ObjectMapper objectMapper, List<RedisCodecProvider> providers) {
		this.objectMapper = objectMapper;
		this.providers = providers == null
				? List.of()
				: providers.stream().sorted(Comparator.comparingInt(RedisCodecProvider::order)).toList();
	}

	private Codec fromProviders(Class<?> type) {
		for (RedisCodecProvider provider : providers) {
			if (provider.supports(type)) {
				Codec codec = provider.create(type, objectMapper);
				if (codec != null) {
					log.debug("[CodecRegistry] provider {} handles {}",
							provider.getClass().getSimpleName(), type.getSimpleName());
					return codec;
				}
			}
		}
		return null;
	}

	@Override
	public <T> Codec obtainCodec(Class<T> type) {
		if (type == String.class) {
			return StringCodec.INSTANCE;
		}
		return codecMap.computeIfAbsent(type, k -> {
			Codec custom = fromProviders(type);
			if (custom != null) {
				return custom;
			}
			Codec c = new TypedJsonJacksonCodec(type, objectMapper);
			log.trace("[CodecRegistry] buildCodec value={}", type.getSimpleName());
			return c;
		});
	}

	@Override
	public <K, V> Codec obtainCodec(Class<K> keyType, Class<V> valueType) {
		if (keyType == String.class && valueType == String.class) {
			return StringCodec.INSTANCE;
		}
		KVKey kvKey = new KVKey(keyType, valueType);
		return codecMap.computeIfAbsent(kvKey, kv -> {
			Codec c = new TypedJsonJacksonCodec(keyType, valueType, objectMapper);
			log.trace("[CodecRegistry] buildCodec key={}, value={}", keyType.getSimpleName(), valueType.getSimpleName());
			return c;
		});
	}

	static final class KVKey {
		final Class<?> k;
		final Class<?> v;

		KVKey(Class<?> k, Class<?> v) {
			this.k = k;
			this.v = v;
		}

		@Override
		public boolean equals(Object o) {
			if (this == o) {
				return true;
			}
			if (!(o instanceof KVKey that)) {
				return false;
			}
			return k.equals(that.k) && v.equals(that.v);
		}

		@Override
		public int hashCode() {
			return 31 * k.hashCode() + v.hashCode();
		}

		@Override
		public String toString() {
			return "KVKey[" + k.getSimpleName() + "," + v.getSimpleName() + "]";
		}
	}
}
