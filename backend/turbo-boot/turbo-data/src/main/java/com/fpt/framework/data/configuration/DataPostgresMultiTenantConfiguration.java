package com.fpt.framework.data.configuration;

import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.annotation.ConditionalOnPlatformDb;
import com.fpt.framework.data.support.model.DataSourceSetting;
import com.fpt.framework.data.support.relation.MultiTenantRelationFactory;
import io.r2dbc.spi.ConnectionFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.DefaultReactiveDataAccessStrategy;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.dialect.DialectResolver;
import org.springframework.data.r2dbc.dialect.PostgresDialect;
import org.springframework.data.r2dbc.dialect.R2dbcDialect;
import org.springframework.r2dbc.core.DatabaseClient;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnPlatformDb(DataSourceSetting.DB_PLATFORM_POSTGRESQL)
public class DataPostgresMultiTenantConfiguration {

	@Bean("pgConnectionFactory")
	public ConnectionFactory pgConnectionFactory(DataSourceHolder dataSourceHolder) {
		return new MultiTenantRelationFactory(dataSourceHolder, DataSourceSetting.DB_PLATFORM_POSTGRESQL,
				"r2dbc:postgresql://root:default@localhost:5432");
	}

	@Bean("pgDatabaseClient")
	@ConditionalOnMissingBean(name = "pgDatabaseClient")
	public DatabaseClient pgDatabaseClient(@Qualifier("pgConnectionFactory") ConnectionFactory connectionFactory) {
		R2dbcDialect dialect = resolveDialect(connectionFactory);
		return DatabaseClient.builder()
				.connectionFactory(connectionFactory)
				.bindMarkers(dialect.getBindMarkersFactory())
				.build();
	}

	@Bean("pgR2dbcEntityTemplate")
	@ConditionalOnMissingBean(name = "pgR2dbcEntityTemplate")
	public R2dbcEntityTemplate pgR2dbcEntityTemplate(@Qualifier("pgDatabaseClient") DatabaseClient databaseClient,
	                                                 R2dbcConverter r2dbcConverter) {
		R2dbcDialect dialect = resolveDialect(databaseClient.getConnectionFactory());
		return new R2dbcEntityTemplate(databaseClient, new DefaultReactiveDataAccessStrategy(dialect, r2dbcConverter));
	}

	private R2dbcDialect resolveDialect(ConnectionFactory connectionFactory) {
		try {
			return DialectResolver.getDialect(connectionFactory);
		} catch (DialectResolver.NoDialectException e) {
			return PostgresDialect.INSTANCE;
		}
	}
}
