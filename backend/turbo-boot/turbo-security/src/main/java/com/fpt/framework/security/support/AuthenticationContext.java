package com.fpt.framework.security.support;

import com.fpt.framework.security.model.AuthenticationUser;
import com.fpt.framework.security.model.AuthenticationUserToken;
import com.fpt.framework.security.model.UserPrincipal;
import com.nimbusds.jwt.JWTParser;
import lombok.SneakyThrows;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;

import java.util.Collections;

public class AuthenticationContext {
    public static Mono<UserPrincipal> currentUserPrincipal() {
        return ReactiveSecurityContextHolder.getContext()
                .map(SecurityContext::getAuthentication)
                .map(u -> u.getPrincipal())
                .cast(UserPrincipal.class);
    }

    public static Mono<AuthenticationUserToken> currentUserToken() {
        return ReactiveSecurityContextHolder.getContext()
                .map(SecurityContext::getAuthentication)
                .cast(AuthenticationUserToken.class);
    }

    @SneakyThrows
    public static Context setCurrentUserPrincipal(UserPrincipal userPrincipal) {
        if (StringUtils.isBlank(userPrincipal.getToken())) {
            return ReactiveSecurityContextHolder.withAuthentication(
                    new AuthenticationUser(userPrincipal)
            );
        }
        InternalJwtDecoder internalJwtDecoder = new InternalJwtDecoder();
        return ReactiveSecurityContextHolder.withAuthentication(
                new AuthenticationUserToken(internalJwtDecoder.parser(
                        JWTParser.parse(userPrincipal.getToken())), Collections.emptyList(), userPrincipal)
        );
    }
}
