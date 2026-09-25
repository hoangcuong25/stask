package com.fpt.framework.data.support.factory.relation;

import org.springframework.data.relational.repository.query.RelationalParameterAccessor;
import org.springframework.r2dbc.core.PreparedOperation;
import reactor.core.publisher.Mono;

@FunctionalInterface
public interface ReactiveRelationQueryBuilder<T> {
    Mono<PreparedOperation<T>> build(Mono<PreparedOperation<T>> query, RelationalParameterAccessor accessor);

    default boolean isSupport(RelationalParameterAccessor accessor) {
        return true;
    }
}
