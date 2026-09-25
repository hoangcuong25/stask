package com.fpt.framework.data.support.factory.nonerelation;

import com.fpt.framework.utility.MethodPointcuts;
import com.fpt.framework.utility.ReflectionFieldUtility;
import lombok.SneakyThrows;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.query.AbstractReactiveMongoQuery;
import org.springframework.data.mongodb.repository.query.ConvertingParameterAccessor;
import org.springframework.data.mongodb.repository.query.ReactiveMongoQueryMethod;
import org.springframework.data.repository.query.ReactiveQueryMethodEvaluationContextProvider;
import org.springframework.expression.ExpressionParser;
import reactor.core.publisher.Mono;

import java.lang.reflect.Method;
import java.util.List;

public class ReactiveNoneRelationQuery extends AbstractReactiveMongoQuery {

    private final AbstractReactiveMongoQuery delegate;

    private final List<ReactiveNoneRelationQueryBuilder> queryBuilders;

    public ReactiveNoneRelationQuery(AbstractReactiveMongoQuery delegate,
                                     List<ReactiveNoneRelationQueryBuilder> queryBuilders
    ) throws IllegalAccessException {
        super((ReactiveMongoQueryMethod) ReflectionFieldUtility.getValueField(delegate, "method"),
                (ReactiveMongoOperations) ReflectionFieldUtility.getValueField(delegate, "operations"),
                (ExpressionParser) ReflectionFieldUtility.getValueField(delegate, "expressionParser"),
                (ReactiveQueryMethodEvaluationContextProvider) ReflectionFieldUtility.getValueField(delegate, "evaluationContextProvider"));
        this.delegate = delegate;
        this.queryBuilders = queryBuilders;
    }


    @SneakyThrows
    @Override
    protected Mono<Query> createQuery(ConvertingParameterAccessor accessor) {
        Mono<Query> query = (Mono<Query>) MethodPointcuts.invokeMethod(delegate, "createQuery", accessor);
        return appendQuery(query, accessor);
    }

    private Mono<Query> appendQuery(Mono<Query> query, ConvertingParameterAccessor accessor) {
        if (queryBuilders != null) {
            for (ReactiveNoneRelationQueryBuilder builder : queryBuilders) {
                if (builder.isSupport(accessor)) {
                    query = builder.build(query, accessor);
                }
            }
        }
        return query;
    }

    @SneakyThrows
    @Override
    protected boolean isCountQuery() {
        return (boolean) MethodPointcuts.invokeMethod(delegate, "isCountQuery");
    }

    @SneakyThrows
    @Override
    protected boolean isExistsQuery() {
        return (boolean) MethodPointcuts.invokeMethod(delegate, "isExistsQuery");
    }

    @SneakyThrows
    @Override
    protected boolean isDeleteQuery() {
        return (boolean) MethodPointcuts.invokeMethod(delegate, "isDeleteQuery");
    }

    @SneakyThrows
    @Override
    protected boolean isLimiting() {
        return (boolean) MethodPointcuts.invokeMethod(delegate, "isLimiting");
    }
}
