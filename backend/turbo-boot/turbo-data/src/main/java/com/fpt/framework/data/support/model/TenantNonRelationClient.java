package com.fpt.framework.data.support.model;

import com.fpt.framework.data.support.ConnectionStringBuilder;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TenantNonRelationClient implements TenantDatasource<MongoClient> {

    private final MongoClient client;

    private String id;

    private DataSourceSetting dataSourceSetting;

    public TenantNonRelationClient(DataSourceSetting dataSourceSetting, ConnectionStringBuilder connectionStringBuilder) {
        this.dataSourceSetting = dataSourceSetting;
        this.id = dataSourceSetting.getTenantId();
        String url = connectionStringBuilder.buildUrlConnection(dataSourceSetting);
        this.client = MongoClients.create(url);
    }


    @Override
    public void closeConnection() {
        this.client.close();
    }
}
