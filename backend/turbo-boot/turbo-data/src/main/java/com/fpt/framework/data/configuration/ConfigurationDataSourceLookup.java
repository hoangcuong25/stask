package com.fpt.framework.data.configuration;


import com.fpt.framework.data.support.model.PoolConfiguration;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;


@Getter
@Setter
public class ConfigurationDataSourceLookup {
    /**
     * Default Cache pool
     */
    private static int DEFAULT_MAXIMUM_CACHE_POOL_SIZE = 50;

    @Value("${cache-size:50}")
    private int maximumCachePoolSize = DEFAULT_MAXIMUM_CACHE_POOL_SIZE;

    private ConfigurationRestLookup rest;

    private boolean grpc;

    private PoolConfiguration pool = new PoolConfiguration();

    @Getter
    @Setter
    public static class ConfigurationRestLookup {
        @Value("${url}")
        private String url;
    }
}
