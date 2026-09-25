package com.fpt.framework.security.support;

import com.fpt.framework.security.model.AuthenticationUserToken;
import com.fpt.framework.security.model.UserPrincipal;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.oauth2.jwt.Jwt;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.Map;

public class AuthenticationTokenConverter implements Converter<Jwt, Mono<AuthenticationUserToken>> {
    private String principalClaimName = "upn";
    private static final String claimName = "name";

    @Override
    public Mono<AuthenticationUserToken> convert(Jwt jwt) {
        Map<String, Object> claims = jwt.getClaims();
        String principalName = claims.get(this.principalClaimName).toString();
        String name = String.valueOf(claims.get(this.claimName));
        UserPrincipal userPrincipal = UserPrincipal.builder().name(name).uniqueName(principalName)
                .token(jwt.getTokenValue()).build();
        return Mono.just(new AuthenticationUserToken(jwt, Collections.emptyList(), userPrincipal));
    }
}
