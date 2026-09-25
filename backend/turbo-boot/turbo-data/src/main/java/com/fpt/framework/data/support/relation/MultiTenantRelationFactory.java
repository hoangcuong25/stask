package com.fpt.framework.data.support.relation;

import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.model.TenantRelationClient;
import io.r2dbc.spi.Connection;
import io.r2dbc.spi.ConnectionFactories;
import io.r2dbc.spi.ConnectionFactory;
import io.r2dbc.spi.ConnectionFactoryMetadata;
import reactor.core.publisher.Mono;

public class MultiTenantRelationFactory implements ConnectionFactory {

	private final DataSourceHolder<TenantRelationClient> datasource;
	private final ConnectionFactory resolvedDefaultConnectionFactory;
	private final String platform;

	public MultiTenantRelationFactory(DataSourceHolder datasource, String platform, String fallbackUrl) {
		this.datasource = datasource;
		this.platform = platform;
		this.resolvedDefaultConnectionFactory = ConnectionFactories.get(fallbackUrl);
	}

	protected Mono<ConnectionFactory> determineTargetConnectionFactory() {
		return this.datasource.databaseCurrentTenantResolver(this.platform)
				.map(TenantRelationClient::getClient);
	}

	@Override
	public Mono<Connection> create() {
		return this.determineTargetConnectionFactory().map(ConnectionFactory::create).flatMap(Mono::from);
	}

	@Override
	public ConnectionFactoryMetadata getMetadata() {
		return this.resolvedDefaultConnectionFactory.getMetadata();
	}
}
