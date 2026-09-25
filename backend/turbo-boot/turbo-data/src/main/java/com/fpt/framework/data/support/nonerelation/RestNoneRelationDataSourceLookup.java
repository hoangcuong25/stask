package com.fpt.framework.data.support.nonerelation;

import com.fpt.framework.data.configuration.ConfigurationDataSourceLookup;
import com.fpt.framework.data.support.ConnectionStringBuilder;
import com.fpt.framework.data.support.DataSourceMultiTenantLookup;
import com.fpt.framework.data.support.model.DataSourceSetting;
import com.fpt.framework.data.support.model.DatasourceKey;
import com.fpt.framework.data.support.model.TenantNonRelationClient;
import com.fpt.framework.utility.ReactiveApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.Assert;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

public class RestNoneRelationDataSourceLookup
        implements DataSourceMultiTenantLookup<TenantNonRelationClient> {

    private final ConfigurationDataSourceLookup configuration;

    private final ConnectionStringBuilder connectionStringBuilder;

    @Autowired
    private ReactiveApplication reactiveApplication;

    public RestNoneRelationDataSourceLookup(ConfigurationDataSourceLookup configuration,
                                            ConnectionStringBuilder connectionStringBuilder) {
        this.configuration = configuration;
        this.connectionStringBuilder = connectionStringBuilder;
    }

    @Override
    public Mono<TenantNonRelationClient> getDataSource(DatasourceKey datasourceKey) {
        // read datasource from remote rest api
        String url = this.configuration.getRest().getUrl();
        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        return reactiveApplication.applicationUnique().flatMap(application -> webClient.get().uri(url, uriBuilder -> uriBuilder
                        .build(datasourceKey.getTenantId(), application))
                .retrieve()
                .bodyToMono(DataSourceSetting.class).map(d -> {
                    Assert.notNull(d, "Datasource connection is null, could not read data from url: " + url);
                    return new TenantNonRelationClient(d, connectionStringBuilder);
                }));
    }
}
