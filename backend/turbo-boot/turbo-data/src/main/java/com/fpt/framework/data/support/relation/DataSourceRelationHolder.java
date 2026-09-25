package com.fpt.framework.data.support.relation;

import com.fpt.framework.data.configuration.ConfigurationDataSourceLookup;
import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.DataSourceMultiTenantLookup;
import com.fpt.framework.data.support.model.TenantRelationClient;
import org.springframework.context.ApplicationEventPublisher;

public class DataSourceRelationHolder extends DataSourceHolder<TenantRelationClient> {
    /**
     * Create instance DataSource Holder with config.
     * Use data source Map as pool store config datasource
     *
     * @param configuration
     */
    public DataSourceRelationHolder(ConfigurationDataSourceLookup configuration,
                                    DataSourceMultiTenantLookup dataSourceMultiTenantLookup,
                                    ApplicationEventPublisher eventPublisher) {
        super(configuration, dataSourceMultiTenantLookup, eventPublisher);
    }
}