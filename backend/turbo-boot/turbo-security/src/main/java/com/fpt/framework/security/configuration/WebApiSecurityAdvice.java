package com.fpt.framework.security.configuration;

import com.fpt.framework.security.model.ForbiddenResponse;
import com.fpt.framework.security.model.UnauthenticatedResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;

@EnableWebFluxSecurity
@RestControllerAdvice
@Slf4j
public class WebApiSecurityAdvice {

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    Mono<ForbiddenResponse> onAccessDeniedException(AccessDeniedException e) {
        log.error("Have no permission. {}", e.getMessage());
        ForbiddenResponse res = new ForbiddenResponse();
        res.setError(e.getLocalizedMessage());
        return Mono.just(res);
    }

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    Mono<UnauthenticatedResponse> onUnauthorizedException(AuthenticationException e) {
        log.error("Unauthorized: ", e);
        UnauthenticatedResponse res = new UnauthenticatedResponse();
        res.setError(e.getLocalizedMessage());
        return Mono.just(res);
    }
}
