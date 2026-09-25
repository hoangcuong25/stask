package com.fpt.framework.data.support.factory.relation;

import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.repository.support.R2dbcRepositoryFactory;
import org.springframework.data.repository.query.QueryLookupStrategy;
import org.springframework.data.repository.query.QueryMethodEvaluationContextProvider;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

public class ReactiveRelationRepositoryFactory extends R2dbcRepositoryFactory {

	private List<ReactiveRelationQueryBuilder> queryBuilders;

	public ReactiveRelationRepositoryFactory(R2dbcEntityOperations entityOperations, List<ReactiveRelationQueryBuilder> queryBuilders) {
		super(entityOperations);
		this.queryBuilders = queryBuilders;
	}


	protected Optional<QueryLookupStrategy> getQueryLookupStrategy(@Nullable QueryLookupStrategy.Key key,
																   QueryMethodEvaluationContextProvider evaluationContextProvider) {
		return super.getQueryLookupStrategy(key, evaluationContextProvider).map(
				strategy -> new RelationQueryLookupStrategy(strategy, queryBuilders)
		);
	}
}
