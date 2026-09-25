package com.fpt.framework.utility.expression.builder.conditional;

import com.fpt.framework.utility.expression.model.ExpressionModel;
import com.fpt.framework.utility.expression.resolver.CriteriaResolver;
import reactor.core.publisher.Mono;

public interface ConditionalBuilder extends CriteriaResolver<ExpressionModel> {
    Mono<Boolean> resolveCondition(String fql, Object data);

    @FunctionalInterface
    public interface ConditionalFunction {
        Boolean resolve(Object compareValue, Object sourceValue);
    }
}
