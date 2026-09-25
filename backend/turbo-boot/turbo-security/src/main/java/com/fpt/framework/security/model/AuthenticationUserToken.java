package com.fpt.framework.security.model;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Collection;

@Getter
public class AuthenticationUserToken extends JwtAuthenticationToken {

    private UserPrincipal principal;
    private Collection<? extends GrantedAuthority> credentials;

    public AuthenticationUserToken(Jwt jwt, Collection<? extends GrantedAuthority> authorities,  UserPrincipal userPrincipal) {
        super(jwt, authorities);
        this.credentials = authorities;
        this.principal = userPrincipal;
    }
}
