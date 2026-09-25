package com.fpt.framework.data.support.factory.relation;

import lombok.SneakyThrows;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.r2dbc.repository.query.AbstractR2dbcQuery;
import org.springframework.data.repository.core.NamedQueries;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.query.QueryLookupStrategy;
import org.springframework.data.repository.query.RepositoryQuery;

import java.lang.reflect.Method;
import java.util.List;

public class RelationQueryLookupStrategy implements QueryLookupStrategy {

    private final QueryLookupStrategy delegate;

    private final List<ReactiveRelationQueryBuilder> queryBuilders;

    public RelationQueryLookupStrategy(QueryLookupStrategy delegate, List<ReactiveRelationQueryBuilder> queryBuilders) {
        this.delegate = delegate;
        this.queryBuilders = queryBuilders;
    }

    @SneakyThrows
    @Override
    public RepositoryQuery resolveQuery(Method method, RepositoryMetadata metadata,
                                        ProjectionFactory factory,
                                        NamedQueries namedQueries) {
        AbstractR2dbcQuery abstractR2dbcQuery = (AbstractR2dbcQuery)
                delegate.resolveQuery(method, metadata, factory, namedQueries);
        return new ReactiveRelationQuery(abstractR2dbcQuery, this.queryBuilders);
    }
}
