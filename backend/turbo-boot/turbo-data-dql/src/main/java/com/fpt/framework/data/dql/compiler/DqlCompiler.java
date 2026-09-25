package com.fpt.framework.data.dql.compiler;

import com.fpt.framework.data.dql.model.FilterExpression;
import com.fpt.framework.data.dql.schema.FieldMeta;
import reactor.core.publisher.Mono;

import java.util.Map;

public interface DqlCompiler<T> {
	Mono<T> compile(String dql, Map<String, FieldMeta> fieldMeta, String rootPath);

	Mono<T> compile(String dql, Map<String, FieldMeta> fieldMeta);

	Mono<T> compile(String dql, String rootPath);

	Mono<T> compile(String dql);

	Mono<T> compile(FilterExpression expression, String rootPath);

	Mono<T> compile(FilterExpression expression);

}
