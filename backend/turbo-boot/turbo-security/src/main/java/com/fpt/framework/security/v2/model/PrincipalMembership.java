package com.fpt.framework.security.v2.model;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class PrincipalMembership {
	private Set<String> userGroups;

	private Set<String> departments;
}
