package com.fpt.framework.web.api.configuration;

import org.springframework.http.HttpHeaders;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;


public class ReactiveTimeRecordWebFilter implements WebFilter {


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        exchange.getResponse().getHeaders().add(HttpHeaders.DATE,
                ZonedDateTime.now().format(DateTimeFormatter.RFC_1123_DATE_TIME));
        return chain.filter(exchange);
    }
}