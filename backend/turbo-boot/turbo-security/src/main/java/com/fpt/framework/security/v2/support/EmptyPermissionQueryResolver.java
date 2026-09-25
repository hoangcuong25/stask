package com.fpt.framework.security.v2.support;

import org.springframework.data.mongodb.core.query.Criteria;
import reactor.core.publisher.Mono;

public class EmptyPermissionQueryResolver implements PermissionQueryResolver {
	@Override
	public Mono<Criteria> buildFilterCriteria(String application, String objectType, String action, String principalKey) {
		return Mono.empty();
	}
}
