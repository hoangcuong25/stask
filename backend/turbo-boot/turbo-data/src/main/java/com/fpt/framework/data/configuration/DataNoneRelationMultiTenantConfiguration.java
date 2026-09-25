package com.fpt.framework.data.configuration;

import com.fpt.framework.data.support.ConnectionStringBuilder;
import com.fpt.framework.data.support.DataIndexCreator;
import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.DataSourceMultiTenantLookup;
import com.fpt.framework.data.support.annotation.ConditionalOnPlatformDb;
import com.fpt.framework.data.support.model.DataSourceSetting;
import com.fpt.framework.data.support.nonerelation.MultiTenantNonRelationFactory;
import com.fpt.framework.data.support.nonerelation.NoneRelationIndexCreator;
import com.fpt.framework.data.support.nonerelation.RestNoneRelationDataSourceLookup;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnPlatformDb(DataSourceSetting.DB_PLATFORM_MONGODB)
public class DataNoneRelationMultiTenantConfiguration {

	@Bean
	public MongoClient mongoClient() {
		return MongoClients.create();
	}

	@Bean()
	@ConditionalOnMissingBean(ReactiveMongoDatabaseFactory.class)
	public ReactiveMongoDatabaseFactory databaseFactory(MongoClient client, DataSourceHolder dataSourceHolder) {
		return new MultiTenantNonRelationFactory(client, dataSourceHolder);
	}

	@Bean()
	@ConditionalOnProperty(prefix = "turbo.data.datasource.lookup.rest", name = "url")
	@ConditionalOnBean(MongoClient.class)
	public DataSourceMultiTenantLookup restDataSourceLookup(ConfigurationDataSourceLookup configurationDataSourceLookup,
															ConnectionStringBuilder connectionStringBuilder) {
		return new RestNoneRelationDataSourceLookup(configurationDataSourceLookup, connectionStringBuilder);
	}

	@Bean
	@ConditionalOnMissingBean(DataIndexCreator.class)
	public DataIndexCreator dataIndexCreator() {
		return new NoneRelationIndexCreator();
	}
}
