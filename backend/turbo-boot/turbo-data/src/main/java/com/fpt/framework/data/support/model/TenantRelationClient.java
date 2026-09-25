package com.fpt.framework.data.support.model;

import com.fpt.framework.data.support.ConnectionStringBuilder;
import io.r2dbc.pool.ConnectionPool;
import io.r2dbc.pool.ConnectionPoolConfiguration;
import io.r2dbc.spi.ConnectionFactories;
import io.r2dbc.spi.ConnectionFactory;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;

import java.time.Duration;

@Getter
@Setter
public class TenantRelationClient implements TenantDatasource<ConnectionFactory> {

    private final ConnectionFactory client;
    private String id;
    private DataSourceSetting dataSourceSetting;

    public TenantRelationClient(DataSourceSetting dataSourceSetting,
                                ConnectionStringBuilder connectionStringBuilder,
                                PoolConfiguration poolConfig) {
        this.dataSourceSetting = dataSourceSetting;
        this.id = dataSourceSetting.getTenantId();
        String url = connectionStringBuilder.buildUrlConnection(dataSourceSetting);

        ConnectionPoolConfiguration.Builder builder = ConnectionPoolConfiguration
                .builder(ConnectionFactories.get(String.format("r2dbc:%s", url)))
                .maxSize(poolConfig.getMaxSize())
                .minIdle(poolConfig.getMinIdle())
                .maxIdleTime(Duration.ofSeconds(poolConfig.getMaxIdleTime()));

        if (poolConfig.getMaxLifetime() > 0) {
            builder.maxLifeTime(Duration.ofSeconds(poolConfig.getMaxLifetime()));
        }
        if (poolConfig.getMaxAcquireTime() > 0) {
            builder.maxAcquireTime(Duration.ofSeconds(poolConfig.getMaxAcquireTime()));
        }
        if (poolConfig.getMaxCreateTime() > 0) {
            builder.maxCreateConnectionTime(Duration.ofSeconds(poolConfig.getMaxCreateTime()));
        }

        if (StringUtils.isNotBlank(poolConfig.getValidationQuery())) {
            builder.validationQuery(poolConfig.getValidationQuery());
        }

        if (poolConfig.getAcquireRetry() > 0) {
            builder.acquireRetry(poolConfig.getAcquireRetry());
        }

        if (poolConfig.getBackgroundEvictionInterval() > 0) {
            builder.backgroundEvictionInterval(Duration.ofSeconds(poolConfig.getBackgroundEvictionInterval()));
        }

        this.client = new ConnectionPool(builder.build());
    }

    @Override
    public void closeConnection() {
        if (client instanceof ConnectionPool pool) {
            pool.dispose();
        }
    }
}
