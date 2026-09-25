package com.fpt.framework.security.v2.support;

import com.fpt.framework.security.v2.model.AuthzRequest;
import com.fpt.framework.security.v2.model.AuthzResponse;
import reactor.core.publisher.Mono;

import java.util.List;

public interface PermissionV2Resolver {
	Mono<AuthzResponse> decide(AuthzRequest request);

	Mono<List<AuthzResponse>> batchDecide(List<AuthzRequest> requests);
}
