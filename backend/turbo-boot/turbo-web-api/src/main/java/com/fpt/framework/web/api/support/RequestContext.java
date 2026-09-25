package com.fpt.framework.web.api.support;

import lombok.Builder;
import lombok.Getter;
import reactor.core.publisher.Mono;
import reactor.util.context.Context;
import reactor.util.context.ContextView;

import java.time.LocalDateTime;


public class RequestContext {


    public static final String REQUEST_CONTEXT_KEY = "Request-Id";

    public static Mono<Request> currentRequest() {
        return Mono
                .deferContextual(Mono::just)
                .filter(ct -> ct.hasKey(REQUEST_CONTEXT_KEY)).map(ct -> currentRequest(ct)).cast(Request.class);
    }

    public static Request currentRequest(ContextView context) {
        if (!context.hasKey(REQUEST_CONTEXT_KEY)) {
            return buildRequest("-");
        }
        return context.get(REQUEST_CONTEXT_KEY);
    }


    public static Context setCurrentRequest(Request request, Context context) {
        return context.put(REQUEST_CONTEXT_KEY, request);
    }

    @Getter
    @Builder
    public static class Request {
        private String id;
        private LocalDateTime issueDate;
    }

    public static Request buildRequest(String id) {
        return Request.builder().id(id).issueDate(LocalDateTime.now()).build();
    }
}
