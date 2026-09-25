package com.fpt.framework.redis.support.codec;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import org.redisson.client.codec.Codec;
import org.redisson.codec.TypedJsonJacksonCodec;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public final class PolymorphicJsonCodecProvider implements RedisCodecProvider {

	private final List<Class<?>> roots;
	private final int order;

	private PolymorphicJsonCodecProvider(List<Class<?>> roots, int order) {
		this.roots = List.copyOf(roots);
		this.order = order;
	}

	public static PolymorphicJsonCodecProvider forHierarchy(Class<?>... roots) {
		return new PolymorphicJsonCodecProvider(Arrays.asList(roots), 0);
	}

	public PolymorphicJsonCodecProvider withOrder(int newOrder) {
		return new PolymorphicJsonCodecProvider(roots, newOrder);
	}

	@Override
	public boolean supports(Class<?> type) {
		return type != null && roots.stream().anyMatch(root -> root.isAssignableFrom(type));
	}

	@Override
	public Codec create(Class<?> type, ObjectMapper defaultMapper) {
		Class<?> root = roots.stream()
				.filter(candidate -> candidate.isAssignableFrom(type))
				.findFirst()
				.orElse(type);

		ObjectMapper typed = Objects.requireNonNullElseGet(defaultMapper, ObjectMapper::new)
				.copy()
				.activateDefaultTyping(
						LaissezFaireSubTypeValidator.instance,
						ObjectMapper.DefaultTyping.NON_FINAL,
						JsonTypeInfo.As.PROPERTY);

		return new TypedJsonJacksonCodec(root, typed);
	}

	@Override
	public int order() {
		return order;
	}
}
