package com.fpt.framework.security.support;

import lombok.Getter;
import lombok.Setter;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;

public class AuthorizationContext {
    public static final String AUTHORIZATION_CONTEXT_KEY = "Authorization-Policy";

    public static Mono<AuthorPolicy> currentAuthorPolicy() {
        return Mono
                .deferContextual(Mono::just)
                .filter(ct -> ct.hasKey(AUTHORIZATION_CONTEXT_KEY)).map(ct
                        -> ct.get(AUTHORIZATION_CONTEXT_KEY)).cast(AuthorPolicy.class)
                .filter(authorPolicy -> null != authorPolicy);
    }

    public static Context setCurrentAuthorPolicy(AuthorPolicy authorization, Context context) {
        return context.put(AUTHORIZATION_CONTEXT_KEY, authorization);
    }

    @Getter
    @Setter
    public static class AuthorPolicy {
        private String resource;
        private String action;
        private String postAuthor;
        private boolean autoPostAuthor;
        private boolean autoFilter;
    }

}
