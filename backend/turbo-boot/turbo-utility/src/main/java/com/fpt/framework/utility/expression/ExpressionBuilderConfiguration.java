package com.fpt.framework.utility.expression;

import lombok.Getter;
import lombok.Setter;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public abstract class ExpressionBuilderConfiguration<T extends ExpressionOperator, E extends OperatorModel<T>> {

    private Map<String, T> operators = new HashMap<>();

    private Map<String, E> compositeOperators = new HashMap<>();

    private Map<String, FunctionResolver> functionResolver = new HashMap<>();

    @FunctionalInterface
    public static interface FunctionResolver {
        Mono<Object> execute(List<Object> params);
    }
}
