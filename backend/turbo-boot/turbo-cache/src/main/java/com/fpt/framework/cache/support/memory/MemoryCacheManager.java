package com.fpt.framework.cache.support.memory;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Expiry;
import org.springframework.cache.caffeine.CaffeineCacheManager;

import java.util.concurrent.TimeUnit;

public class MemoryCacheManager extends CaffeineCacheManager {
    public static String NAME_STORE_CACHE = "memory-cache";

    public MemoryCacheManager() {
        super(NAME_STORE_CACHE);
        Caffeine caffeine = Caffeine.newBuilder()
                .initialCapacity(10)
                .maximumSize(200)
                .expireAfter(new Expiry<String, Object>() {
                    @Override
                    public long expireAfterCreate(String key, Object value, long currentTime) {
                        return TimeUnit.MINUTES.toNanos(10);
                    }
                    @Override
                    public long expireAfterUpdate(String key, Object value, long currentTime, long currentDuration) {
                        return TimeUnit.MINUTES.toNanos(10);
                    }
                    @Override
                    public long expireAfterRead(String key, Object value, long currentTime, long currentDuration) {
                        return currentDuration;
                    }
                })
                ;
        this.setCaffeine(caffeine);
    }
}
