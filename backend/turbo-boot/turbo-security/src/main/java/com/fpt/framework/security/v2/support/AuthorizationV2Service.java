package com.fpt.framework.security.v2.support;

import com.fpt.framework.security.v2.model.AuthzRequest;
import com.fpt.framework.security.v2.model.AuthzResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.AccessDeniedException;
import reactor.core.publisher.Mono;

import java.util.Map;

@Slf4j
public class AuthorizationV2Service {

	@Autowired
	@Lazy
	private PermissionV2Resolver client;

	public Mono<Void> requirePermission(AuthzRequest request) {
		return client.decide(request)
				.switchIfEmpty(Mono.error(new AccessDeniedException(
						"Access denied: authorization resolver returned no decision for "
								+ request.getAction() + " on " + request.getObjectType())))
				.flatMap(response -> {
					if (!response.isAllow()) {
						String message = "";
						if (StringUtils.isEmpty(request.getObjectId())) {
							message = String.format(
									"Access denied by %s: %s on %s",
									response.getDenyReason(),
									request.getAction(),
									request.getObjectType()
							);
						} else {
							message = String.format(
									"Access denied by %s: %s on %s/%s",
									response.getDenyReason(),
									request.getAction(),
									request.getObjectType(),
									request.getObjectId()
							);
						}
						return Mono.error(new AccessDeniedException(message));
					}
					return Mono.empty();
				});
	}

	public Mono<Boolean> hasPermission(AuthzRequest request) {
		return client.decide(request)
				.map(AuthzResponse::isAllow)
				.defaultIfEmpty(false)
				.onErrorReturn(false);
	}

	public Mono<Void> requireActionPermission(String application, String action, String objectType) {
		AuthzRequest req = AuthzRequest.actionOnly(application, action, objectType);
		return requirePermission(req);
	}

	public Mono<Void> requireDataPermission(String application, String action, String objectType, String objectId, Map<String, String> attributes) {
		AuthzRequest req = AuthzRequest.dataAware(application, action, objectType, objectId, attributes);
		return requirePermission(req);
	}
}
