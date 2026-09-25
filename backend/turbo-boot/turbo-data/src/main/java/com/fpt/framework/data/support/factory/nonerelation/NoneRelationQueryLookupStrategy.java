package com.fpt.framework.data.support.factory.nonerelation;

import lombok.SneakyThrows;
import org.springframework.data.mongodb.repository.query.AbstractReactiveMongoQuery;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.repository.core.NamedQueries;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.query.QueryLookupStrategy;
import org.springframework.data.repository.query.RepositoryQuery;

import java.lang.reflect.Method;
import java.util.List;

public class NoneRelationQueryLookupStrategy implements QueryLookupStrategy {

    private final QueryLookupStrategy delegate;

    private final List<ReactiveNoneRelationQueryBuilder> queryBuilders;

    public NoneRelationQueryLookupStrategy(QueryLookupStrategy delegate,List<ReactiveNoneRelationQueryBuilder> queryBuilders) {
        this.delegate = delegate;
        this.queryBuilders = queryBuilders;
    }


    @SneakyThrows
    @Override
    public RepositoryQuery resolveQuery(Method method, RepositoryMetadata metadata,
                                        ProjectionFactory factory,
                                        NamedQueries namedQueries) {
        AbstractReactiveMongoQuery abstractReactiveMongoQuery = (AbstractReactiveMongoQuery)
                delegate.resolveQuery(method, metadata, factory, namedQueries);
        return new ReactiveNoneRelationQuery(abstractReactiveMongoQuery, this.queryBuilders);
    }
}
