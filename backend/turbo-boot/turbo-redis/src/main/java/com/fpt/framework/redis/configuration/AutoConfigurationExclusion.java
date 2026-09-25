package com.fpt.framework.redis.configuration;

import org.redisson.spring.starter.RedissonAutoConfiguration;
import org.redisson.spring.starter.RedissonAutoConfigurationV2;
import org.springframework.boot.autoconfigure.AutoConfigurationImportFilter;
import org.springframework.boot.autoconfigure.AutoConfigurationImportSelector;
import org.springframework.boot.autoconfigure.AutoConfigurationMetadata;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class AutoConfigurationExclusion extends AutoConfigurationImportSelector implements AutoConfigurationImportFilter {
	private final Set<String> autoConfigurationExclude = new HashSet<>(Arrays.asList(
			RedissonAutoConfiguration.class.getCanonicalName(),
			RedissonAutoConfigurationV2.class.getCanonicalName()
	));

	@Override
	public boolean[] match(String[] classNames, AutoConfigurationMetadata metadata) {
		boolean[] matches = new boolean[classNames.length];
		for (int i = 0; i < classNames.length; i++) {
			matches[i] = !autoConfigurationExclude.contains(classNames[i]);
		}
		return matches;
	}

}

