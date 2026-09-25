package com.fpt.framework.data.dql.compiler.relation;

import com.fpt.framework.data.dql.compiler.AbstractDqlCompiler;
import com.fpt.framework.data.dql.compiler.DqlCompiler;
import com.fpt.framework.data.dql.exception.DqlUnsupportedOperationException;
import com.fpt.framework.data.dql.model.FilterCondition;
import com.fpt.framework.data.dql.model.FilterExpression;
import com.fpt.framework.data.dql.model.LikeMode;
import com.fpt.framework.data.dql.model.Operator;
import com.fpt.framework.data.dql.model.SqlFragment;
import com.fpt.framework.data.dql.model.ValueSource;
import com.fpt.framework.data.dql.resolver.VariableResolver;
import com.fpt.framework.data.dql.schema.FieldMeta;
import com.fpt.framework.data.dql.schema.FieldType;
import com.fpt.framework.utility.converter.CollectionConverter;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Log4j2
public class SqlFragmentCompiler implements DqlCompiler<SqlFragment> {

	private final VariableResolver variableResolver;

	public SqlFragmentCompiler(VariableResolver variableResolver) {
		this.variableResolver = variableResolver;
	}

	@Override
	public Mono<SqlFragment> compile(String dql, Map<String, FieldMeta> fieldMeta, String rootPath) {
		return new FragmentCompilationWorker(variableResolver).compile(dql, fieldMeta, rootPath);
	}

	@Override
	public Mono<SqlFragment> compile(String dql, Map<String, FieldMeta> fieldMeta) {
		return new FragmentCompilationWorker(variableResolver).compile(dql, fieldMeta);
	}

	@Override
	public Mono<SqlFragment> compile(String dql, String rootPath) {
		return new FragmentCompilationWorker(variableResolver).compile(dql, rootPath);
	}

	@Override
	public Mono<SqlFragment> compile(String dql) {
		return new FragmentCompilationWorker(variableResolver).compile(dql);
	}

	@Override
	public Mono<SqlFragment> compile(FilterExpression expression, String rootPath) {
		return new FragmentCompilationWorker(variableResolver).compile(expression, rootPath);
	}

	@Override
	public Mono<SqlFragment> compile(FilterExpression expression) {
		return new FragmentCompilationWorker(variableResolver).compile(expression);
	}

	private static class FragmentCompilationWorker extends AbstractDqlCompiler<SqlFragment> {

		private int counter = 0;

		FragmentCompilationWorker(VariableResolver variableResolver) {
			super(variableResolver);
		}

		private String nextParamName() {
			return "p" + counter++;
		}

		@Override
		protected Mono<SqlFragment> createEmptyResult() {
			return Mono.just(SqlFragment.empty());
		}

		@Override
		protected FieldType getFieldType(String fieldPath, Map<String, FieldMeta> fieldMeta) {
			FieldType type = super.getFieldType(fieldPath, fieldMeta);
			if (type != FieldType.OTHER) {
				return type;
			}
			if (fieldPath.contains(".")) {
				String rawField = fieldPath.substring(fieldPath.lastIndexOf('.') + 1);
				return super.getFieldType(rawField, fieldMeta);
			}
			return FieldType.OTHER;
		}

		@Override
		protected SqlFragment buildCondition(FilterCondition condition, String fieldPath, Object value) {
			log.trace("Building SQL fragment for field: {}, operator: {}", fieldPath, condition.getOperator());

			if (condition.getSource() == ValueSource.FIELD_REF) {
				return buildFieldComparison(condition.getOperator(), fieldPath, Objects.toString(value, ""));
			}

			return switch (condition.getOperator()) {
				case IS_NULL, NOT_EXISTS -> new SqlFragment(SqlClause.field(fieldPath).isNull().toSql(), Map.of());
				case NOT_NULL, EXISTS -> new SqlFragment(SqlClause.field(fieldPath).isNotNull().toSql(), Map.of());
				case EQ, NE -> buildSimple(fieldPath, condition.getOperator(), value, condition.isIgnoreCase());
				case GT, GTE, LT, LTE -> buildSimple(fieldPath, condition.getOperator(), value, false);
				case IN -> buildInFragment(fieldPath, value, false);
				case NOT_IN -> buildInFragment(fieldPath, value, true);
				case LIKE -> buildLikeFragment(fieldPath, value, condition.isIgnoreCase(), LikeMode.CONTAINS);
				case NOT_LIKE -> buildNotLikeFragment(fieldPath, value, condition.isIgnoreCase());
				case STARTS_WITH -> buildLikeFragment(fieldPath, value, condition.isIgnoreCase(), LikeMode.STARTS_WITH);
				case ENDS_WITH -> buildLikeFragment(fieldPath, value, condition.isIgnoreCase(), LikeMode.ENDS_WITH);
			};
		}

		@Override
		protected SqlFragment combineWithAnd(List<SqlFragment> results) {
			return SqlFragment.combine(results, "AND");
		}

		@Override
		protected SqlFragment combineWithOr(List<SqlFragment> results) {
			return SqlFragment.combine(results, "OR");
		}

		private SqlFragment buildSimple(String fieldPath, Operator op, Object value, boolean ignoreCase) {
			String param = nextParamName();
			LinkedHashMap<String, Object> params = new LinkedHashMap<>();
			params.put(param, value);
			SqlClause clause = switch (op) {
				case EQ -> SqlClause.field(fieldPath).eq(param);
				case NE -> SqlClause.field(fieldPath).ne(param);
				case GT -> SqlClause.field(fieldPath).gt(param);
				case GTE -> SqlClause.field(fieldPath).gte(param);
				case LT -> SqlClause.field(fieldPath).lt(param);
				case LTE -> SqlClause.field(fieldPath).lte(param);
				default -> throw new DqlUnsupportedOperationException(op.name(), "Not a simple comparison operator in SqlFragmentCompiler");
			};
			if (ignoreCase) {
				clause = clause.ignoreCase();
			}
			return new SqlFragment(clause.toSql(), params);
		}

		private SqlFragment buildInFragment(String fieldPath, Object value, boolean negate) {
			Collection<?> values = CollectionConverter.toCollection(value);
			if (values.isEmpty()) {
				return negate ? SqlFragment.empty() : new SqlFragment("1=0", Map.of());
			}
			List<String> paramRefs = new ArrayList<>();
			LinkedHashMap<String, Object> params = new LinkedHashMap<>();
			for (Object element : values) {
				String param = nextParamName();
				paramRefs.add(":" + param);
				params.put(param, element);
			}
			String sql = negate
					? SqlClause.field(fieldPath).notIn(paramRefs).toSql()
					: SqlClause.field(fieldPath).in(paramRefs).toSql();
			return new SqlFragment(sql, params);
		}

		private SqlFragment buildLikeFragment(String fieldPath, Object value, boolean ignoreCase, LikeMode mode) {
			String raw = Objects.toString(value, "");
			String pattern = switch (mode) {
				case CONTAINS -> "%" + raw + "%";
				case STARTS_WITH -> raw + "%";
				case ENDS_WITH -> "%" + raw;
			};
			String param = nextParamName();
			LinkedHashMap<String, Object> params = new LinkedHashMap<>();
			params.put(param, pattern);
			SqlClause clause = SqlClause.field(fieldPath).like(param);
			if (ignoreCase) {
				clause = clause.ignoreCase();
			}
			return new SqlFragment(clause.toSql(), params);
		}

		private SqlFragment buildNotLikeFragment(String fieldPath, Object value, boolean ignoreCase) {
			String raw = Objects.toString(value, "");
			String pattern = "%" + raw + "%";
			String param = nextParamName();
			LinkedHashMap<String, Object> params = new LinkedHashMap<>();
			params.put(param, pattern);
			SqlClause clause = SqlClause.field(fieldPath).notLike(param);
			if (ignoreCase) {
				clause = clause.ignoreCase();
			}
			return new SqlFragment(clause.toSql(), params);
		}

		private SqlFragment buildFieldComparison(Operator op, String leftField, String rightField) {
			return new SqlFragment(leftField + " " + op.toSql() + " " + rightField, Map.of());
		}
	}
}
