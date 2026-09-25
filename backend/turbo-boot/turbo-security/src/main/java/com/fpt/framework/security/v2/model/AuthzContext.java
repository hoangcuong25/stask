package com.fpt.framework.security.v2.model;

import com.fpt.framework.security.model.PermissionPolicy;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AuthzContext {
	private List<PermissionPolicy> rbacPolicies; // optional

	private PrincipalMembership membership;
}
