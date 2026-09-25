package com.fpt.framework.data.support;

import com.fpt.framework.data.configuration.ConfigurationDataSourceLookup;
import com.fpt.framework.data.support.model.TenantDatasource;
import org.springframework.context.ApplicationEventPublisher;

public class MultiTenantDatasourceHolder<T extends TenantDatasource<?>> extends DataSourceHolder<T> {
	/**
	 * Create instance DataSource Holder with config.
	 * Use data source Map as pool store config datasource
	 *
	 * @param configuration
	 * @param dataSourceMultiTenantLookup
	 * @param eventPublisher
	 */
	public MultiTenantDatasourceHolder(ConfigurationDataSourceLookup configuration, DataSourceMultiTenantLookup<T> dataSourceMultiTenantLookup, ApplicationEventPublisher eventPublisher) {
		super(configuration, dataSourceMultiTenantLookup, eventPublisher);
	}
}

