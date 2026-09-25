package com.fpt.framework.data.dql.resolver;

import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.function.Supplier;

@FunctionalInterface
public interface VariableProvider {
	Map<String, Supplier<Mono<Object>>> getVariables();
}
