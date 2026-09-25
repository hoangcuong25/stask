package com.fpt.framework.security.v2.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AuthzResponse {
	private boolean allow;
	private String denyReason;           // "RBAC" | "ACL" | "ABAC" | null
	private List<String> allowedActions; // For UI

	public static AuthzResponse allow(List<String> allowedActions) {
		return AuthzResponse.builder()
				.allow(true)
				.denyReason(null)
				.allowedActions(allowedActions)
				.build();
	}

	public static AuthzResponse deny(String reason) {
		return AuthzResponse.builder()
				.allow(false)
				.denyReason(reason)
				.allowedActions(List.of())
				.build();
	}
}
