package com.fpt.framework.security.v2.support;

import com.fpt.framework.security.v2.model.AuthzRequest;
import com.fpt.framework.security.v2.model.AuthzResponse;
import reactor.core.publisher.Mono;

import java.util.List;

public class DefaultPermissionV2Resolver implements PermissionV2Resolver {
	@Override
	public Mono<AuthzResponse> decide(AuthzRequest request) {
		return Mono.empty();
	}

	@Override
	public Mono<List<AuthzResponse>> batchDecide(List<AuthzRequest> requests) {
		return Mono.empty();
	}
}
