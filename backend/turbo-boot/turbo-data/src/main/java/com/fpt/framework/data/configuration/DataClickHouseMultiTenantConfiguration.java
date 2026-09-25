package com.fpt.framework.data.configuration;

import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.annotation.ConditionalOnPlatformDb;
import com.fpt.framework.data.support.model.DataSourceSetting;
import com.fpt.framework.data.support.relation.MultiTenantRelationFactory;
import io.r2dbc.spi.ConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnPlatformDb(DataSourceSetting.DB_PLATFORM_CLICKHOUSE)
public class DataClickHouseMultiTenantConfiguration {

	@Bean("clickhouseConnectionFactory")
	public ConnectionFactory clickhouseConnectionFactory(DataSourceHolder dataSourceHolder) {
		return new MultiTenantRelationFactory(dataSourceHolder, DataSourceSetting.DB_PLATFORM_CLICKHOUSE,
				"r2dbc:clickhouse://root:default@localhost:8123");
	}
}
