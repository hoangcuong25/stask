package com.fpt.framework.data.configuration;

import com.fpt.framework.data.support.ConnectionStringBuilder;
import com.fpt.framework.data.support.DataConfiguration;
import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.DataSourceMultiTenantLookup;
import com.fpt.framework.data.support.DataWebSupportConfiguration;
import com.fpt.framework.data.support.MultiTenantDatasourceHolder;
import com.fpt.framework.data.support.model.PoolConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.Ordered;

/**
 * Autoconfiguration datasource
 */
@Configuration()
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@Import({DataWebSupportConfiguration.class,
        DataNoneRelationMultiTenantConfiguration.class,
        DataRelationMultiTenantConfiguration.class,
        DataClickHouseMultiTenantConfiguration.class,
        DataPostgresMultiTenantConfiguration.class,
        DataNoneRelationConfiguration.class
})
public class DataAutoConfiguration {
    @Bean
    @ConditionalOnMissingBean(DataConfiguration.class)
    public DataConfiguration dataConfiguration() {
        return DataConfiguration.getInstance();
    }

    @Bean()
    public ConnectionStringBuilder connectionStringBuilder() {
        return new ConnectionStringBuilder();
    }

    @Bean
    public ConfigurationDataSourceLookup configurationDataSourceLookup(PoolConfiguration poolConfiguration) {
        ConfigurationDataSourceLookup config = new ConfigurationDataSourceLookup();
        config.setPool(poolConfiguration);
        return config;
    }

    @Bean
    @ConfigurationProperties(prefix = "turbo.data.pool")
    public PoolConfiguration poolConfiguration() {
        return new PoolConfiguration();
    }

    @Bean
    @ConditionalOnMissingBean(DataSourceHolder.class)
    @ConditionalOnBean(DataSourceMultiTenantLookup.class)
    public DataSourceHolder<?> dataSourceHolder(ConfigurationDataSourceLookup configuration,
                                                DataSourceMultiTenantLookup dataSourceMultiTenantLookup,
                                                ApplicationEventPublisher eventPublisher) {
        return new MultiTenantDatasourceHolder(configuration, dataSourceMultiTenantLookup, eventPublisher);
    }
}
