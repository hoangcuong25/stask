package com.fpt.framework.data.support.nonerelation;

import com.fpt.framework.data.configuration.ConfigurationDataSourceLookup;
import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.DataSourceMultiTenantLookup;
import com.fpt.framework.data.support.model.TenantNonRelationClient;
import org.springframework.context.ApplicationEventPublisher;

public class DataSourceNonRelationHolder extends DataSourceHolder<TenantNonRelationClient> {
    /**
     * Create instance DataSource Holder with config.
     * Use data source Map as pool store config datasource
     *
     * @param configuration
     */
    public DataSourceNonRelationHolder(ConfigurationDataSourceLookup configuration,
                                       DataSourceMultiTenantLookup dataSourceMultiTenantLookup,
                                       ApplicationEventPublisher eventPublisher) {
        super(configuration,dataSourceMultiTenantLookup, eventPublisher);
    }
}
