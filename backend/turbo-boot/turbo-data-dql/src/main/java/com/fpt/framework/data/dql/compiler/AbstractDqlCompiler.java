package com.fpt.framework.data.dql.compiler;

import com.fpt.framework.data.dql.exception.DqlException;
import com.fpt.framework.data.dql.exception.DqlInvalidExpressionException;
import com.fpt.framework.data.dql.exception.DqlParseException;
import com.fpt.framework.data.dql.exception.DqlUnsupportedOperationException;
import com.fpt.framework.data.dql.exception.DqlVariableException;
import com.fpt.framework.data.dql.model.FilterCondition;
import com.fpt.framework.data.dql.model.FilterExpression;
import com.fpt.framework.data.dql.model.FilterGroup;
import com.fpt.framework.data.dql.model.FilterNode;
import com.fpt.framework.data.dql.model.LogicalOp;
import com.fpt.framework.data.dql.model.Operator;
import com.fpt.framework.data.dql.model.VarRef;
import com.fpt.framework.data.dql.parser.DqlParser;
import com.fpt.framework.data.dql.resolver.VariableResolver;
import com.fpt.framework.data.dql.schema.FieldMeta;
import com.fpt.framework.data.dql.schema.FieldType;
import com.fpt.framework.utility.converter.DateTimeConverter;
import io.micrometer.common.util.StringUtils;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Log4j2
public abstract class AbstractDqlCompiler<T> implements DqlCompiler<T> {

	protected final VariableResolver variableResolver;

	protected AbstractDqlCompiler(VariableResolver variableResolver) {
		this.variableResolver = variableResolver;
	}

	@Override
	public Mono<T> compile(String dql, Map<String, FieldMeta> fieldMeta, String rootPath) {
		log.debug("Compiling DQL: {}", dql);

		try {
			FilterExpression expression = DqlParser.parse(dql, fieldMeta);
			return compile(expression, rootPath);
		} catch (Exception e) {
			log.error("Failed to parse DQL: {}", e.getMessage());
			return Mono.error(e);
		}
	}

	@Override
	public Mono<T> compile(String dql, Map<String, FieldMeta> fieldMeta) {
		return compile(dql, fieldMeta, null);
	}

	@Override
	public Mono<T> compile(String dql, String rootPath) {
		return compile(dql, Map.of(), rootPath);
	}

	@Override
	public Mono<T> compile(String dql) {
		return compile(dql, Map.of());
	}

	@Override
	public Mono<T> compile(FilterExpression expression, String rootPath) {
		if (expression == null || expression.getGroups() == null || expression.getGroups().isEmpty()) {
			log.debug("Compiling empty expression");
			return createEmptyResult();
		}

		log.debug("Compiling expression with {} root nodes", expression.getGroups().size());

		return Flux.fromIterable(expression.getGroups())
				.flatMap(node -> compileNode(node, expression.getFieldsMeta(), rootPath))
				.collectList()
				.map(this::combineWithAnd)
				.doOnError(e -> log.error("Compilation failed: {}", e.getMessage()));
	}

	@Override
	public Mono<T> compile(FilterExpression expression) {
		return compile(expression, null);
	}

	protected Mono<T> compileNode(FilterNode node, Map<String, FieldMeta> fieldMeta, String rootPath) {
		if (node instanceof FilterGroup group) {
			return compileGroup(group, fieldMeta, rootPath);
		}

		if (node instanceof FilterCondition condition) {
			return compileCondition(condition, fieldMeta, rootPath);
		}

		return Mono.error(new DqlInvalidExpressionException("Unknown node type: " + node.getClass().getSimpleName()));
	}

	protected Mono<T> compileGroup(FilterGroup group, Map<String, FieldMeta> fieldMeta, String rootPath) {
		return Flux.fromIterable(group.getNodes())
				.flatMap(node -> compileNode(node, fieldMeta, rootPath))
				.collectList()
				.map(children ->
						group.getOp() == LogicalOp.AND
								? combineWithAnd(children)
								: combineWithOr(children)
				);
	}

	protected Mono<T> compileCondition(FilterCondition condition, Map<String, FieldMeta> fieldMeta, String rootPath) {
		String fieldPath = condition.getField();

		if (StringUtils.isNotEmpty(rootPath)) {
			fieldPath = rootPath + "." + fieldPath;
		}

		FieldType fieldType = getFieldType(fieldPath, fieldMeta);

		validateOperator(condition.getOperator(), fieldType);

		if (isOperatorWithoutValue(condition.getOperator())) {
			return Mono.just(buildCondition(condition, fieldPath, null));
		}

		String fieldPathFinal = fieldPath;

		if (condition.getValue() instanceof VarRef varRef) {
			if (variableResolver == null) {
				return Mono.error(new DqlVariableException(varRef.getName()));
			}
			return variableResolver.resolve(varRef.getName()).map(rawValue -> {
				Object typedValue = coerceValue(rawValue, fieldType);
				return buildCondition(condition, fieldPathFinal, typedValue);
			});
		}

		Object typedValue = coerceValue(condition.getValue(), fieldType);
		return Mono.just(buildCondition(condition, fieldPathFinal, typedValue));
	}

	private boolean isOperatorWithoutValue(Operator operator) {
		return operator == Operator.IS_NULL
				|| operator == Operator.NOT_NULL
				|| operator == Operator.EXISTS
				|| operator == Operator.NOT_EXISTS;
	}

	protected Object coerceValue(Object value, FieldType fieldType) {
		if (value == null) {
			return null;
		}

		if (value instanceof Collection<?> col) {
			return col.stream().map(el -> coerceElement(el, fieldType)).toList();
		}

		try {
			return switch (fieldType) {
				case NUMBER -> coerceNumber(value);
				case BOOLEAN -> coerceBoolean(value);
				case DATE -> coerceDate(value);
				case DATETIME -> coerceDatetime(value);
				case ARRAY -> coerceArray(value);
				default -> value;
			};
		} catch (DqlException e) {
			throw e;
		} catch (Exception e) {
			log.warn("Failed to coerce value, using as-is: {}", e.getMessage());
			return value;
		}
	}

	private Object coerceElement(Object el, FieldType fieldType) {
		if (el == null) {
			return null;
		}
		try {
			return switch (fieldType) {
				case NUMBER -> coerceNumber(el);
				case BOOLEAN -> coerceBoolean(el);
				case DATE -> coerceDate(el);
				case DATETIME -> coerceDatetime(el);
				default -> coerceDateOrKeep(el);
			};
		} catch (DqlException e) {
			throw e;
		} catch (Exception ignored) {
			return el;
		}
	}

	protected Object coerceDate(Object value) {
		if (value instanceof LocalDate || value instanceof LocalDateTime) {
			return value;
		}
		if (!(value instanceof String str)) {
			return value;
		}
		LocalDate ld = DateTimeConverter.toLocalDate(str);
		if (ld != null) {
			return ld;
		}
		throw new DqlParseException("Cannot parse as date: '" + str + "'", -1);
	}

	protected Object coerceDatetime(Object value) {
		if (value instanceof LocalDateTime) {
			return value;
		}
		if (value instanceof LocalDate ld) {
			return ld.atStartOfDay();
		}
		if (!(value instanceof String str)) {
			return value;
		}
		LocalDateTime ldt = DateTimeConverter.toLocalDateTime(str);
		if (ldt != null) {
			return ldt;
		}
		throw new DqlParseException("Cannot parse as datetime: '" + str + "'", -1);
	}

	protected Object coerceNumber(Object value) {
		if (value instanceof Number) {
			return value;
		}
		String s = value.toString().trim();
		if (s.contains(".")) {
			return Double.parseDouble(s);
		}
		try {
			return Long.parseLong(s);
		} catch (NumberFormatException e) {
			return Double.parseDouble(s);
		}
	}

	protected Object coerceBoolean(Object value) {
		if (value instanceof Boolean) {
			return value;
		}
		return Boolean.parseBoolean(value.toString());
	}

	protected Object coerceArray(Object value) {
		if (value instanceof Collection<?> col) {
			return col.stream().map(this::coerceDateOrKeep).toList();
		}
		return List.of(coerceDateOrKeep(value));
	}

	private Object coerceDateOrKeep(Object el) {
		if (!(el instanceof String str)) {
			return el;
		}
		LocalDate ld = DateTimeConverter.toLocalDate(str);
		if (ld != null) {
			return ld;
		}
		LocalDateTime ldt = DateTimeConverter.toLocalDateTime(str);
		if (ldt != null) {
			return ldt;
		}
		return el;
	}

	protected FieldType getFieldType(String fieldPath, Map<String, FieldMeta> fieldMeta) {
		if (fieldMeta == null || !fieldMeta.containsKey(fieldPath)) {
			return FieldType.OTHER;
		}
		return fieldMeta.get(fieldPath).getType();
	}

	private void validateOperator(Operator op, FieldType fieldType) {
		if (fieldType == FieldType.OTHER) {
			return;
		}

		Set<Operator> rejected = switch (fieldType) {
			case NUMBER -> Set.of(Operator.LIKE, Operator.NOT_LIKE, Operator.STARTS_WITH, Operator.ENDS_WITH);
			case BOOLEAN -> Set.of(Operator.GT, Operator.GTE, Operator.LT, Operator.LTE,
					Operator.LIKE, Operator.NOT_LIKE, Operator.STARTS_WITH, Operator.ENDS_WITH,
					Operator.IN, Operator.NOT_IN);
			case DATE, DATETIME -> Set.of(Operator.LIKE, Operator.NOT_LIKE, Operator.STARTS_WITH, Operator.ENDS_WITH);
			case ARRAY -> Set.of(Operator.EQ, Operator.NE, Operator.GT, Operator.GTE, Operator.LT, Operator.LTE,
					Operator.LIKE, Operator.NOT_LIKE, Operator.STARTS_WITH, Operator.ENDS_WITH);
			default -> Set.of();
		};

		if (rejected.contains(op)) {
			throw new DqlUnsupportedOperationException(op.name(),
					op.name() + " is not supported for " + fieldType + " fields");
		}
	}

	protected abstract Mono<T> createEmptyResult();

	protected abstract T buildCondition(FilterCondition condition, String fieldPath, Object value);

	protected abstract T combineWithAnd(List<T> results);

	protected abstract T combineWithOr(List<T> results);
}
