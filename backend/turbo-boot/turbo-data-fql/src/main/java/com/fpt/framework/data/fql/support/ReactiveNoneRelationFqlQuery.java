package com.fpt.framework.data.fql.support;

import com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationQueryBuilder;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.query.ConvertingParameterAccessor;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ReactiveNoneRelationFqlQuery implements ReactiveNoneRelationQueryBuilder {


    @Override
    public Mono<Query> build(Mono<Query> query, ConvertingParameterAccessor accessor) {
        Object[] arguments = accessor.getValues();
        return query.map(q -> {
            Set<Criteria> criteria = matchTypeCriteria(arguments).map(a -> (Criteria) a).collect(Collectors.toSet());
            for (Criteria c : criteria) {
                q = q.addCriteria(c);
            }
            return q;
        });
    }

    @Override
    public boolean isSupport(ConvertingParameterAccessor accessor) {
        Object[] arguments = accessor.getValues();
        return matchTypeCriteria(arguments).findFirst().isPresent();
    }

    private Stream<Object> matchTypeCriteria(Object[] objects) {
        return Arrays.stream(objects).filter(object -> object.getClass().equals(Criteria.class));
    }
}
