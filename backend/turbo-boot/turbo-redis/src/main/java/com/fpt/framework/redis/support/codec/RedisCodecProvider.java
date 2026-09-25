package com.fpt.framework.redis.support.codec;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.redisson.client.codec.Codec;

public interface RedisCodecProvider {

	boolean supports(Class<?> type);

	Codec create(Class<?> type, ObjectMapper defaultMapper);

	default int order() {
		return 0;
	}
}
