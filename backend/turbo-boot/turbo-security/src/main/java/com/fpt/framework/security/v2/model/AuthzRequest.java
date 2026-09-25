package com.fpt.framework.security.v2.model;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class AuthzRequest {
	private String application;
	private String action;
	private String objectType;
	private String objectId;          // Empty = action-only
	private Map<String, String> attributes;

	// Factory methods
	public static AuthzRequest actionOnly(
			String application,
			String action,
			String objectType
	) {
		return AuthzRequest.builder()
				.application(application)
				.action(action)
				.objectType(objectType)
				.objectId("")
				.attributes(Map.of())
				.build();
	}

	public static AuthzRequest dataAware(
			String application,
			String action,
			String objectType,
			String objectId,
			Map<String, String> attributes
	) {
		return AuthzRequest.builder()
				.application(application)
				.action(action)
				.objectType(objectType)
				.objectId(objectId)
				.attributes(attributes)
				.build();
	}
}
