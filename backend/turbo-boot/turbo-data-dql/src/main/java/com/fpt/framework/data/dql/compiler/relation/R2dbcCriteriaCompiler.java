package com.fpt.framework.data.dql.compiler.relation;

import com.fpt.framework.data.dql.compiler.AbstractDqlCompiler;
import com.fpt.framework.data.dql.exception.DqlUnsupportedOperationException;
import com.fpt.framework.data.dql.model.FilterCondition;
import com.fpt.framework.data.dql.model.FilterExpression;
import com.fpt.framework.data.dql.model.Operator;
import com.fpt.framework.data.dql.model.ValueSource;
import com.fpt.framework.data.dql.resolver.VariableResolver;
import com.fpt.framework.utility.converter.CollectionConverter;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.relational.core.query.Criteria;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;

@Log4j2
public class R2dbcCriteriaCompiler extends AbstractDqlCompiler<Criteria> {

	private static final Map<Operator, BiFunction<String, Object, Criteria>> BUILDERS = Map.ofEntries(
			Map.entry(Operator.EQ, (f, v) -> Criteria.where(f).is(v)),
			Map.entry(Operator.NE, (f, v) -> Criteria.where(f).not(v)),
			Map.entry(Operator.GT, (f, v) -> Criteria.where(f).greaterThan(v)),
			Map.entry(Operator.GTE, (f, v) -> Criteria.where(f).greaterThanOrEquals(v)),
			Map.entry(Operator.LT, (f, v) -> Criteria.where(f).lessThan(v)),
			Map.entry(Operator.LTE, (f, v) -> Criteria.where(f).lessThanOrEquals(v)),
			Map.entry(Operator.IS_NULL, (f, v) -> Criteria.where(f).isNull()),
			Map.entry(Operator.NOT_EXISTS, (f, v) -> Criteria.where(f).isNull()),
			Map.entry(Operator.NOT_NULL, (f, v) -> Criteria.where(f).isNotNull()),
			Map.entry(Operator.EXISTS, (f, v) -> Criteria.where(f).isNotNull())
	);

	public R2dbcCriteriaCompiler(VariableResolver variableResolver) {
		super(variableResolver);
	}

	@Override
	public Mono<Criteria> compile(FilterExpression expression, String rootPath) {
		if (rootPath != null && !rootPath.isBlank()) {
			log.warn("R2dbcCriteriaCompiler: rootPath '{}' received but not applied (table alias not yet supported for Criteria)", rootPath);
		}
		return super.compile(expression, null);
	}

	@Override
	protected Mono<Criteria> createEmptyResult() {
		return Mono.just(Criteria.empty());
	}

	@Override
	protected Criteria buildCondition(FilterCondition condition, String fieldPath, Object value) {
		log.trace("Building R2DBC Criteria for field: {}, operator: {}", fieldPath, condition.getOperator());

		if (condition.getSource() == ValueSource.FIELD_REF) {
			throw new DqlUnsupportedOperationException(
					"FIELD_REF",
					"Field-to-field comparison is not supported by R2dbcCriteriaCompiler. Use SqlFragmentCompiler instead.");
		}

		if (condition.isIgnoreCase()) {
			log.warn("IGNORECASE is not supported by Spring Data R2DBC Criteria for field '{}' operator '{}'. " +
							"Falling back to case-sensitive comparison. Use SqlFragmentCompiler for accurate IGNORECASE support.",
					fieldPath, condition.getOperator());
		}

		Operator op = condition.getOperator();

		if (op == Operator.IN) {
			Collection<?> inValues = CollectionConverter.toCollection(value);
			return Criteria.where(fieldPath).in(inValues);
		}
		if (op == Operator.NOT_IN) {
			Collection<?> ninValues = CollectionConverter.toCollection(value);
			return Criteria.where(fieldPath).notIn(ninValues);
		}

		BiFunction<String, Object, Criteria> builder = BUILDERS.get(op);
		if (builder != null) {
			return builder.apply(fieldPath, value);
		}

		throw new DqlUnsupportedOperationException(
				op.name(),
				"Operator not supported by R2dbcCriteriaCompiler. Use SqlFragmentCompiler for LIKE, NOT_LIKE, STARTS_WITH, ENDS_WITH.");
	}

	@Override
	protected Criteria combineWithAnd(List<Criteria> results) {
		if (results.isEmpty()) {
			return Criteria.empty();
		}
		if (results.size() == 1) {
			return results.get(0);
		}
		Criteria combined = results.get(0);
		for (int i = 1; i < results.size(); i++) {
			combined = combined.and(results.get(i));
		}
		return combined;
	}

	@Override
	protected Criteria combineWithOr(List<Criteria> results) {
		if (results.isEmpty()) {
			return Criteria.empty();
		}
		if (results.size() == 1) {
			return results.get(0);
		}
		Criteria combined = results.get(0);
		for (int i = 1; i < results.size(); i++) {
			combined = combined.or(results.get(i));
		}
		return combined;
	}

}
