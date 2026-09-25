package com.fpt.framework.utility.expression.resolver;

import reactor.core.publisher.Mono;

public interface CriteriaResolver<T> {
    Mono<T> parserCriteria(String fql);
}
