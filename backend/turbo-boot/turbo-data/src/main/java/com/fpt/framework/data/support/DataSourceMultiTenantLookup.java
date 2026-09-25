package com.fpt.framework.data.support;

import com.fpt.framework.data.support.model.DatasourceKey;
import com.fpt.framework.data.support.model.TenantDatasource;
import reactor.core.publisher.Mono;

public interface DataSourceMultiTenantLookup<S extends TenantDatasource<?>> {

	Mono<S> getDataSource(DatasourceKey datasourceKey);
}
