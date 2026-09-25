package com.fpt.framework.security.v2.support.data;

import com.fpt.framework.data.support.factory.nonerelation.ReactiveNoneRelationQueryBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.query.ConvertingParameterAccessor;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@RequiredArgsConstructor
@Slf4j
public class ReactiveQueryBuilder implements ReactiveNoneRelationQueryBuilder {

	private final ReactivePermissionV2Query permissionQuery;

	@Override
	public Mono<Query> build(Mono<Query> query, ConvertingParameterAccessor accessor) {
		log.debug("ReactiveV2QueryBuilder.build() invoked");

		return query.flatMap(permissionQuery::authorizeQuery)
				.onErrorResume(error -> {
					log.error("V2 QueryBuilder error, denying access", error);
					return query.map(q -> {
						// Return impossible query to deny all
						Query denied = new Query(Criteria.where("_id").is("__DENY__"));
						denied.limit(q.getLimit());
						denied.skip(q.getSkip());
						return denied;
					});
				});
	}

	@Override
	public boolean isSupport(ConvertingParameterAccessor accessor) {
		// Check if method has Criteria parameter
		Object[] arguments = accessor.getValues();
		return Arrays.stream(arguments)
				.anyMatch(arg -> arg != null && arg.getClass().equals(Criteria.class));
	}
}