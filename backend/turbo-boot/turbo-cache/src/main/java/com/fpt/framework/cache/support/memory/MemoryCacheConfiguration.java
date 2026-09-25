package com.fpt.framework.cache.support.memory;

import com.fpt.framework.cache.support.KeyCacheGenerator;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingClass;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;

@Configuration
@Role(BeanDefinition.ROLE_INFRASTRUCTURE)
public class MemoryCacheConfiguration {


    @Bean
    public MemoryCacheManager cacheManager() {
        MemoryCacheManager cacheManager = new MemoryCacheManager();
        return cacheManager;
    }


    @Bean
    @ConditionalOnMissingBean
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    public KeyGenerator keyGenerator() {
        return new KeyCacheGenerator();
    }


    @Bean
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    public MemoryCacheReactiveMethodInterceptor memoryCacheInterceptor(KeyGenerator keyCacheGenerator,
                                                                       MemoryCacheManager cacheManager) {
        MemoryCacheReactiveMethodInterceptor interceptor = new MemoryCacheReactiveMethodInterceptor(cacheManager,
                keyCacheGenerator, MemoryCacheManager.NAME_STORE_CACHE);
        return interceptor;
    }
}
