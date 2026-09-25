package com.fpt.framework.data.dql.compiler.nonrelation;

import com.fpt.framework.data.dql.compiler.AbstractDqlCompiler;
import com.fpt.framework.data.dql.exception.DqlParseException;
import com.fpt.framework.data.dql.exception.DqlUnsupportedOperationException;
import com.fpt.framework.data.dql.model.FilterCondition;
import com.fpt.framework.data.dql.model.LikeMode;
import com.fpt.framework.data.dql.model.Operator;
import com.fpt.framework.data.dql.model.ValueSource;
import com.fpt.framework.data.dql.resolver.VariableResolver;
import com.fpt.framework.utility.converter.DateTimeConverter;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.mongodb.MongoExpression;
import org.springframework.data.mongodb.core.query.Criteria;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

@Log4j2
public class MongoCriteriaCompiler extends AbstractDqlCompiler<Criteria> {

	private static final Pattern REGEX_ESCAPE_PATTERN = Pattern.compile("([.\\+*?\\[^\\]$(){}=!<>|:\\-/])");

	private static final ZoneId DEFAULT_ZONE = resolveZoneId();

	public MongoCriteriaCompiler(VariableResolver variableResolver) {
		super(variableResolver);
	}

	private static ZoneId resolveZoneId() {
		String tz = System.getenv("TZ");
		if (tz != null && !tz.isBlank()) {
			try {
				return ZoneId.of(tz);
			} catch (Exception ignored) {
				log.warn("Invalid TZ env var '{}', falling back to Asia/Ho_Chi_Minh", tz);
			}
		}
		return ZoneId.of("Asia/Ho_Chi_Minh");
	}

	@Override
	protected Mono<Criteria> createEmptyResult() {
		return Mono.just(new Criteria());
	}

	@Override
	protected Criteria buildCondition(FilterCondition condition, String fieldPath, Object value) {
		log.trace("Building MongoDB criteria for field: {}, operator: {}", fieldPath, condition.getOperator());

		if (condition.getSource() == ValueSource.FIELD_REF) {
			String otherPath = Objects.toString(value, "");
			return buildFieldComparison(condition.getOperator(), "$" + fieldPath, "$" + otherPath);
		}

		return switch (condition.getOperator()) {
			case EQ -> Criteria.where(fieldPath).is(value);
			case NE -> Criteria.where(fieldPath).ne(value);
			case IN -> {
				List<Object> parsedValues = ((Collection<?>) value).stream()
						.map(this::parseDateValue)
						.toList();
				yield Criteria.where(fieldPath).in(parsedValues);
			}
			case NOT_IN -> {
				List<Object> parsedValues = ((Collection<?>) value).stream()
						.map(this::parseDateValue)
						.toList();
				yield Criteria.where(fieldPath).nin(parsedValues);
			}
			case GT -> Criteria.where(fieldPath).gt(value);
			case GTE -> Criteria.where(fieldPath).gte(value);
			case LT -> Criteria.where(fieldPath).lt(value);
			case LTE -> Criteria.where(fieldPath).lte(value);
			case LIKE -> buildRegexCriteria(fieldPath, value, condition.isIgnoreCase(), LikeMode.CONTAINS);
			case NOT_LIKE -> new Criteria().norOperator(
					buildRegexCriteria(fieldPath, value, condition.isIgnoreCase(), LikeMode.CONTAINS)
			);
			case STARTS_WITH -> buildRegexCriteria(fieldPath, value, condition.isIgnoreCase(), LikeMode.STARTS_WITH);
			case ENDS_WITH -> buildRegexCriteria(fieldPath, value, condition.isIgnoreCase(), LikeMode.ENDS_WITH);
			case IS_NULL -> Criteria.where(fieldPath).is(null);
			case NOT_NULL -> Criteria.where(fieldPath).ne(null);
			case EXISTS -> Criteria.where(fieldPath).exists(true);
			case NOT_EXISTS -> Criteria.where(fieldPath).exists(false);
		};
	}

	@Override
	protected Criteria combineWithAnd(List<Criteria> results) {
		if (results.isEmpty()) {
			return new Criteria();
		}
		if (results.size() == 1) {
			return results.get(0);
		}
		return new Criteria().andOperator(results.toArray(new Criteria[0]));
	}

	@Override
	protected Criteria combineWithOr(List<Criteria> results) {
		if (results.isEmpty()) {
			return new Criteria();
		}
		if (results.size() == 1) {
			return results.get(0);
		}
		return new Criteria().orOperator(results.toArray(new Criteria[0]));
	}

	@Override
	protected Object coerceDate(Object value) {
		if (value instanceof LocalDate ld) {
			return Date.from(ld.atStartOfDay(DEFAULT_ZONE).toInstant());
		}
		if (value instanceof LocalDateTime ldt) {
			return Date.from(ldt.atZone(DEFAULT_ZONE).toInstant());
		}
		if (value instanceof String str) {
			LocalDate ld = DateTimeConverter.toLocalDate(str);
			if (ld != null) {
				return Date.from(ld.atStartOfDay(DEFAULT_ZONE).toInstant());
			}
			throw new DqlParseException("Cannot parse as date: '" + str + "'", -1);
		}
		return value;
	}

	@Override
	protected Object coerceDatetime(Object value) {
		if (value instanceof LocalDateTime ldt) {
			return Date.from(ldt.atZone(DEFAULT_ZONE).toInstant());
		}
		if (value instanceof LocalDate ld) {
			return Date.from(ld.atStartOfDay(DEFAULT_ZONE).toInstant());
		}
		if (value instanceof String str) {
			LocalDateTime ldt = DateTimeConverter.toLocalDateTime(str);
			if (ldt != null) {
				return Date.from(ldt.atZone(DEFAULT_ZONE).toInstant());
			}
			throw new DqlParseException("Cannot parse as datetime: '" + str + "'", -1);
		}
		return value;
	}

	private Object parseDateValue(Object value) {
		if (value instanceof LocalDate ld) {
			return Date.from(ld.atStartOfDay(DEFAULT_ZONE).toInstant());
		}
		if (value instanceof LocalDateTime ldt) {
			return Date.from(ldt.atZone(DEFAULT_ZONE).toInstant());
		}
		return value;
	}

	private Criteria buildRegexCriteria(String fieldPath, Object input, boolean ignoreCase, LikeMode mode) {
		String raw = Objects.toString(input, "");
		String escaped = REGEX_ESCAPE_PATTERN.matcher(raw).replaceAll("\\\\$1");
		String pattern = switch (mode) {
			case CONTAINS -> ".*" + escaped + ".*";
			case STARTS_WITH -> "^" + escaped + ".*";
			case ENDS_WITH -> ".*" + escaped + "$";
		};
		Pattern regex = ignoreCase
				? Pattern.compile(pattern, Pattern.CASE_INSENSITIVE)
				: Pattern.compile(pattern);
		return Criteria.where(fieldPath).regex(regex);
	}

	private Criteria buildFieldComparison(Operator op, String leftField, String rightField) {
		String mongoOp = switch (op) {
			case EQ -> "$eq";
			case NE -> "$ne";
			case GT -> "$gt";
			case GTE -> "$gte";
			case LT -> "$lt";
			case LTE -> "$lte";
			default -> throw new DqlUnsupportedOperationException(op.name(), "Field-to-field comparison supports EQ, NE, GT, GTE, LT, LTE only");
		};
		MongoExpression expression = MongoExpression.create(mongoOp, leftField, rightField);
		return Criteria.expr(expression);
	}

}
