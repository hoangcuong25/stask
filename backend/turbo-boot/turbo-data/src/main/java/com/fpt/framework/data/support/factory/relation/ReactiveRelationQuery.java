package com.fpt.framework.data.support.factory.relation;

import com.fpt.framework.utility.MethodPointcuts;
import com.fpt.framework.utility.ReflectionFieldUtility;
import lombok.SneakyThrows;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.repository.query.AbstractR2dbcQuery;
import org.springframework.data.r2dbc.repository.query.R2dbcQueryMethod;
import org.springframework.data.r2dbc.repository.query.StringBasedR2dbcQuery;
import org.springframework.data.relational.repository.query.RelationalParameterAccessor;
import org.springframework.r2dbc.core.PreparedOperation;
import reactor.core.publisher.Mono;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

public class ReactiveRelationQuery extends AbstractR2dbcQuery {

    private final AbstractR2dbcQuery delegate;

    private final boolean isQueryStringType;

    private final List<ReactiveRelationQueryBuilder> queryBuilders;

    public ReactiveRelationQuery(AbstractR2dbcQuery delegate,
                                 List<ReactiveRelationQueryBuilder> queryBuilders
    ) throws IllegalAccessException {
        super((R2dbcQueryMethod) ReflectionFieldUtility.getValueField(delegate, "method"),
                (R2dbcEntityOperations) ReflectionFieldUtility.getValueField(delegate, "entityOperations"),
                (R2dbcConverter) ReflectionFieldUtility.getValueField(delegate, "converter"));
        this.delegate = delegate;
        this.queryBuilders = queryBuilders;
        this.isQueryStringType = delegate instanceof StringBasedR2dbcQuery;
    }

    @SneakyThrows
    @Override
    protected Mono<PreparedOperation<?>> createQuery(RelationalParameterAccessor accessor) {
		Mono<PreparedOperation<?>> query = (Mono<PreparedOperation<?>>) MethodPointcuts.invokeMethod(delegate, "createQuery", new Class[]{ RelationalParameterAccessor.class }, accessor);
        return appendQuery(query, accessor);
    }

    private Mono<PreparedOperation<?>> appendQuery(Mono<PreparedOperation<?>> query, RelationalParameterAccessor accessor) {
        if (queryBuilders != null) {
            for (ReactiveRelationQueryBuilder builder : queryBuilders) {
                if (!builder.isSupport(accessor)) {
                    continue;
                }
                Type builderType = getQueryBuilderType(builder);
                boolean isMatchedType = true;
                if (this.isQueryStringType && !builderType.equals(String.class)) {
                    isMatchedType = false;
                }
                if (isMatchedType) {
                    query = builder.build(query, accessor);
                }

            }
        }
        return query;
    }

    @SneakyThrows
    @Override
    protected boolean isModifyingQuery() {
        return (boolean) MethodPointcuts.invokeMethod(delegate, "isModifyingQuery");
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

    private static Type getQueryBuilderType(ReactiveRelationQueryBuilder<?> builder) {
        return ((ParameterizedType) builder.getClass().getGenericInterfaces()[0]).getActualTypeArguments()[0];
    }
}
