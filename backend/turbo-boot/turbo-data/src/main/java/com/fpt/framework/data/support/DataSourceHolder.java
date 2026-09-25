package com.fpt.framework.data.support;

import com.fpt.framework.data.configuration.ConfigurationDataSourceLookup;
import com.fpt.framework.data.exception.MissingTenantInContextException;
import com.fpt.framework.data.support.event.DataSourceLoadedEvent;
import com.fpt.framework.data.support.model.DatasourceKey;
import com.fpt.framework.data.support.model.TenantDatasource;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.RemovalCause;
import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.ApplicationEventPublisher;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Log4j2
public abstract class DataSourceHolder<S extends TenantDatasource<?>> {
    private final DataSourceMultiTenantLookup<S> dataSourceMultiTenantLookup;
    private final ApplicationEventPublisher eventPublisher;
    private final Cache<DatasourceKey, S> cache;
    private final Map<DatasourceKey, Mono<S>> inProgressRequests = new ConcurrentHashMap<>();

    /**
     * Create instance DataSource Holder with config.
     * Use data source Map as pool store config datasource
     */
    public DataSourceHolder(ConfigurationDataSourceLookup configuration,
                            DataSourceMultiTenantLookup<S> dataSourceMultiTenantLookup,
                            ApplicationEventPublisher eventPublisher
    ) {
        this.dataSourceMultiTenantLookup = dataSourceMultiTenantLookup;
        this.eventPublisher = eventPublisher;
        this.cache = Caffeine.newBuilder()
                .expireAfterAccess(60, TimeUnit.MINUTES)
                .maximumSize(configuration.getMaximumCachePoolSize())
                .evictionListener((DatasourceKey key, S value, RemovalCause cause) -> onCacheInvalid(key, value, cause))
                .build();
    }

    /**
     * This will get called for each DB operations
     *
     * @return MongoDatabase
     */
    public Mono<S> databaseCurrentTenantResolver(String platform) {
        return TenantContext.currentTenant()
                .switchIfEmpty(Mono.error(
                        new MissingTenantInContextException
                                ("Have no Tenant Id in context. Consider add filter to active it")))
                .flatMap(t -> this.getCurrentTenantDataSource(new DatasourceKey(t.getId(), platform)));
    }

    /**
     * @return TenantClient tenant client.
     */
    public Mono<S> getCurrentTenantDataSource(DatasourceKey datasourceKey) {
        return Mono.defer(() -> {
            S cachedValue = cache.getIfPresent(datasourceKey);
            if (cachedValue != null) {
                log.trace("reuse datasource key={} from cache", datasourceKey);
                return Mono.just(cachedValue);
            }
            return inProgressRequests.computeIfAbsent(datasourceKey, key -> dataSourceMultiTenantLookup.getDataSource(key)
                    .doOnNext(value -> {
                        // push event load datasource
                        log.trace("Tenant {} have datasource {}", datasourceKey, value.getDataSourceSetting());
                        DataSourceLoadedEvent dataSourceLoadedEvent = new DataSourceLoadedEvent(datasourceKey.getTenantId(), value);
                        this.eventPublisher.publishEvent(dataSourceLoadedEvent);
                        cache.put(key, value);
                    }).doFinally(signalType -> inProgressRequests.remove(key)).cache());
        });
    }

    /**
     * Remove cache datasource for key (tenant & platform)
     * @param datasourceKey
     */
    public void removeCache(DatasourceKey datasourceKey) {
        this.cache.invalidate(datasourceKey);
        log.trace("Removing key {} in cache", datasourceKey);
    }

    @SneakyThrows
    private void onCacheInvalid(DatasourceKey key, S value, RemovalCause cause) {
        log.trace("Cache entry invalidated: Key={}, Cause={}, try to close connection", key, cause);
        value.closeConnection();
    }
}
