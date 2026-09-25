package com.fpt.framework.data.support.nonerelation;

import com.fpt.framework.data.support.DataSourceHolder;
import com.fpt.framework.data.support.model.DataSourceSetting;
import com.fpt.framework.data.support.model.TenantNonRelationClient;
import com.mongodb.ClientSessionOptions;
import com.mongodb.reactivestreams.client.ClientSession;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoDatabase;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.data.mongodb.core.SimpleReactiveMongoDatabaseFactory;
import reactor.core.publisher.Mono;

public class MultiTenantNonRelationFactory
        extends SimpleReactiveMongoDatabaseFactory
{

    private final DataSourceHolder<TenantNonRelationClient> datasource;

    /**
     * @param client       datasource bean component
     * @param datasource
     */
    public MultiTenantNonRelationFactory(MongoClient client,
            DataSourceHolder datasource) {
        super(client, "default");
        this.datasource = datasource;
    }


    @Override
    public Mono<MongoDatabase> getMongoDatabase() throws DataAccessException {
        return datasource.databaseCurrentTenantResolver(DataSourceSetting.DB_PLATFORM_MONGODB).map(d -> {
            DataSourceSetting dataSourceSetting = d.getDataSourceSetting();
            String database = dataSourceSetting.getDatabase();
            if (StringUtils.isBlank(database)) {
                database = String.format("%s-%s", dataSourceSetting.getTenantId(), dataSourceSetting.getApplication());
            }
            return d.getClient().getDatabase(database);
        });
    }

    @Override
    public Mono<ClientSession> getSession(ClientSessionOptions options) {
        return datasource.databaseCurrentTenantResolver(DataSourceSetting.DB_PLATFORM_MONGODB)
                .flatMap(d -> Mono.from(d.getClient().startSession(options)));
    }
}
