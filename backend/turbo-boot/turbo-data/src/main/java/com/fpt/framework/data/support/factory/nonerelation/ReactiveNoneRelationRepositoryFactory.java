package com.fpt.framework.data.support.factory.nonerelation;

import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.repository.support.ReactiveMongoRepositoryFactory;
import org.springframework.data.repository.query.QueryLookupStrategy;
import org.springframework.data.repository.query.QueryMethodEvaluationContextProvider;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

public class ReactiveNoneRelationRepositoryFactory extends ReactiveMongoRepositoryFactory {


    private List<ReactiveNoneRelationQueryBuilder> queryBuilders;

    public ReactiveNoneRelationRepositoryFactory(ReactiveMongoOperations mongoOperations, List<ReactiveNoneRelationQueryBuilder> queryBuilders) {
        super(mongoOperations);
        this.queryBuilders = queryBuilders;
    }


    protected Optional<QueryLookupStrategy> getQueryLookupStrategy(@Nullable QueryLookupStrategy.Key key,
                                                                   QueryMethodEvaluationContextProvider evaluationContextProvider) {
        return super.getQueryLookupStrategy(key, evaluationContextProvider).map(
                strategy -> new NoneRelationQueryLookupStrategy(strategy, queryBuilders)
        );
    }
}
