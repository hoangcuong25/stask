package com.fpt.framework.data.configuration;

import com.fpt.framework.data.support.DataIndexCreator;
import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.annotation.ConditionalOnPlatformDb;
import com.fpt.framework.data.support.model.DataSourceSetting;
import com.fpt.framework.data.support.relation.MultiTenantRelationFactory;
import com.fpt.framework.data.support.relation.RelationIndexCreator;
import io.r2dbc.spi.ConnectionFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.data.convert.CustomConversions;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.convert.R2dbcCustomConversions;
import org.springframework.data.r2dbc.core.DefaultReactiveDataAccessStrategy;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.dialect.DialectResolver;
import org.springframework.data.r2dbc.dialect.MySqlDialect;
import org.springframework.data.r2dbc.dialect.R2dbcDialect;
import org.springframework.data.r2dbc.mapping.R2dbcMappingContext;
import org.springframework.data.relational.core.mapping.DefaultNamingStrategy;
import org.springframework.data.relational.core.mapping.NamingStrategy;
import org.springframework.r2dbc.core.DatabaseClient;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnPlatformDb(DataSourceSetting.DB_PLATFORM_MYSQL)
public class DataRelationMultiTenantConfiguration {

	@Bean("mysqlConnectionFactory")
	@Primary
	public ConnectionFactory mysqlConnectionFactory(DataSourceHolder dataSourceHolder) {
		return new MultiTenantRelationFactory(dataSourceHolder, DataSourceSetting.DB_PLATFORM_MYSQL,
				"r2dbc:mysql://root:default@localhost:3306");
	}

	@Bean("mysqlDatabaseClient")
	@Primary
	@ConditionalOnMissingBean(name = "mysqlDatabaseClient")
	public DatabaseClient mysqlDatabaseClient(@Qualifier("mysqlConnectionFactory") ConnectionFactory connectionFactory) {
		R2dbcDialect dialect = resolveDialect(connectionFactory);
		return DatabaseClient.builder()
				.connectionFactory(connectionFactory)
				.bindMarkers(dialect.getBindMarkersFactory())
				.build();
	}

	@Bean("mysqlR2dbcEntityTemplate")
	@Primary
	@ConditionalOnMissingBean(name = "mysqlR2dbcEntityTemplate")
	public R2dbcEntityTemplate mysqlR2dbcEntityTemplate(@Qualifier("mysqlDatabaseClient") DatabaseClient databaseClient,
	                                                    R2dbcConverter r2dbcConverter) {
		R2dbcDialect dialect = resolveDialect(databaseClient.getConnectionFactory());
		return new R2dbcEntityTemplate(databaseClient, new DefaultReactiveDataAccessStrategy(dialect, r2dbcConverter));
	}

	@Bean
	@ConditionalOnMissingBean
	public R2dbcCustomConversions r2dbcCustomConversions(@Qualifier("mysqlConnectionFactory") ConnectionFactory connectionFactory) {
		R2dbcDialect dialect = resolveDialect(connectionFactory);
		List<Object> converters = new ArrayList<>(dialect.getConverters());
		converters.addAll(R2dbcCustomConversions.STORE_CONVERTERS);
		return new R2dbcCustomConversions(
				CustomConversions.StoreConversions.of(dialect.getSimpleTypeHolder(), converters),
				Collections.emptyList());
	}

	@Bean
	@ConditionalOnMissingBean
	public R2dbcMappingContext r2dbcMappingContext(ObjectProvider<NamingStrategy> namingStrategy,
	                                               R2dbcCustomConversions r2dbcCustomConversions) {
		R2dbcMappingContext context = new R2dbcMappingContext(
				namingStrategy.getIfAvailable(() -> DefaultNamingStrategy.INSTANCE));
		context.setSimpleTypeHolder(r2dbcCustomConversions.getSimpleTypeHolder());
		return context;
	}

	@Bean
	@ConditionalOnMissingBean(DataIndexCreator.class)
	public DataIndexCreator dataIndexCreator() {
		return new RelationIndexCreator();
	}

	private R2dbcDialect resolveDialect(ConnectionFactory connectionFactory) {
		try {
			return DialectResolver.getDialect(connectionFactory);
		} catch (DialectResolver.NoDialectException e) {
			return MySqlDialect.INSTANCE;
		}
	}
}
