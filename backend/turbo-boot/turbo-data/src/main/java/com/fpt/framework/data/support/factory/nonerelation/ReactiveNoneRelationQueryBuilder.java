package com.fpt.framework.data.support.factory.nonerelation;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.query.ConvertingParameterAccessor;
import reactor.core.publisher.Mono;

@FunctionalInterface
public interface ReactiveNoneRelationQueryBuilder {
    Mono<Query> build(Mono<Query> query, ConvertingParameterAccessor accessor);

    default boolean isSupport(ConvertingParameterAccessor accessor) {
        return true;
    }
}
