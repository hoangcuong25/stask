package com.fpt.framework.security.model;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.Collections;

public class AuthenticationUser extends AbstractAuthenticationToken {

    private UserPrincipal principal;

    public AuthenticationUser(UserPrincipal principal) {
        super(Collections.emptyList());
        this.setAuthenticated(true);
        this.principal = principal;
        this.setDetails(principal);
    }

    @Override
    public Object getCredentials() {
        return this.principal.getName();
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}
