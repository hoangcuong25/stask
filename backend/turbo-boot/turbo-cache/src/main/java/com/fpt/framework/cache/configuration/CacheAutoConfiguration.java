package com.fpt.framework.cache.configuration;

import com.fpt.framework.cache.support.memory.MemoryCacheConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(MemoryCacheConfiguration.class)
public class CacheAutoConfiguration {
}
