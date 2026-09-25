package com.fpt.framework.data.dql.parser;

import com.fpt.framework.data.dql.exception.DqlParseException;
import com.fpt.framework.data.dql.model.FilterCondition;
import com.fpt.framework.data.dql.model.FilterGroup;
import com.fpt.framework.data.dql.model.FilterNode;
import com.fpt.framework.data.dql.model.LogicalOp;
import com.fpt.framework.data.dql.model.Operator;
import com.fpt.framework.data.dql.model.Projection;
import com.fpt.framework.data.dql.model.SortDir;
import com.fpt.framework.data.dql.model.SortSpec;
import com.fpt.framework.data.dql.model.ValueSource;
import com.fpt.framework.data.dql.model.VarRef;
import com.fpt.framework.utility.converter.DateTimeConverter;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Parser {
	private final List<Token> t;
	private int p = 0;

	@Getter
	private List<SortSpec> resultSorts = List.of();
	@Getter
	private Projection resultProjection = null;

	public Parser(List<Token> tokens) {
		this.t = tokens;
	}

	public FilterNode parseExpression() {
		FilterNode node = parseOr();

		resultSorts = tryParseOrderBy();
		resultProjection = tryParseSelect();

		if (!eof()) {
			throw new DqlParseException("Unexpected token: " + peek(), p);
		}
		return node;
	}

	private FilterNode parseOr() {
		List<FilterNode> parts = new ArrayList<>();
		do {
			parts.add(parseAnd());
		} while (match(TokenType.OR));
		if (parts.size() == 1) {
			return parts.get(0);
		}
		return new FilterGroup(LogicalOp.OR, parts);
	}

	private FilterNode parseAnd() {
		List<FilterNode> parts = new ArrayList<>();
		do {
			parts.add(parsePrimary());
		} while (match(TokenType.AND));
		if (parts.size() == 1) {
			return parts.get(0);
		}
		return new FilterGroup(LogicalOp.AND, parts);
	}

	private FilterNode parsePrimary() {
		if (match(TokenType.LPAREN)) {
			FilterNode inside = parseOr();
			expect(TokenType.RPAREN, ") expected");
			return inside;
		}

		if (match(TokenType.LIKE)) {
			return parseLikeFunctionStyle();
		}

		if (match(TokenType.NOT)) {
			expect(TokenType.LIKE, "Expected LIKE after NOT");
			return parseNotLikeFunctionStyle();
		}

		return parseConditionOrInfixLike();
	}

	private List<SortSpec> tryParseOrderBy() {
		if (!match(TokenType.ORDER)) {
			return List.of();
		}
		expect(TokenType.BY, "'BY' expected after ORDER");
		List<SortSpec> sorts = new ArrayList<>();
		do {
			String f = expectIdent("Field expected in ORDER BY");
			SortDir dir = SortDir.ASC;
			if (match(TokenType.DESC)) {
				dir = SortDir.DESC;
			}
			sorts.add(new SortSpec(f, dir));
		} while (match(TokenType.COMMA));
		return sorts;
	}

	private Projection tryParseSelect() {
		if (!match(TokenType.SELECT)) {
			return null;
		}
		boolean distinct = match(TokenType.DISTINCT);
		String f = expectIdent("Field expected after SELECT");
		return new Projection(f, distinct);
	}

	private FilterNode parseNotLikeFunctionStyle() {
		String field = expectIdent("Field name expected after NOT LIKE");
		// optional mode token — canonical is CONTAINS, but accept any; NOT_LIKE always means "not contains"
		if (!match(TokenType.CONTAINS)) {
			if (!match(TokenType.STARTS_WITH)) {
				match(TokenType.ENDS_WITH);
			}
		}
		String text = expectString("String expected for NOT LIKE");
		boolean ignoreCase = false;
		if (match(TokenType.COMMA)) {
			expect(TokenType.IGNORECASE, "Expected IGNORECASE after ','");
			ignoreCase = true;
		}
		return new FilterCondition(field, Operator.NOT_LIKE, ValueSource.LITERAL, text, ignoreCase);
	}

	private FilterNode parseLikeFunctionStyle() {
		String field = expectIdent("Field name expected after LIKE");
		Operator op = Operator.LIKE;
		boolean ignoreCase = false;

		if (match(TokenType.STARTS_WITH)) {
			op = Operator.STARTS_WITH;
		} else if (match(TokenType.ENDS_WITH)) {
			op = Operator.ENDS_WITH;
		} else if (match(TokenType.CONTAINS)) {
			op = Operator.LIKE;
		}

		String text = expectString("String expected for LIKE");
		if (match(TokenType.COMMA)) {
			expect(TokenType.IGNORECASE, "Expected IGNORECASE after ','");
			ignoreCase = true;
		}
		return new FilterCondition(field, op, ValueSource.LITERAL, text, ignoreCase);
	}

	private FilterNode parseConditionOrInfixLike() {
		String field = expectIdent("Field name expected");
		// infix LIKE?
		if (match(TokenType.LIKE)) {
			String text = expectString("String expected after LIKE");
			boolean ignoreCase = match(TokenType.IGNORECASE);
			return new FilterCondition(field, Operator.LIKE, ValueSource.LITERAL, text, ignoreCase);
		}
		// IS NULL / IS NOT NULL
		if (match(TokenType.IS)) {
			if (match(TokenType.NULL)) {
				return new FilterCondition(field, Operator.IS_NULL, ValueSource.LITERAL, null, false);
			}
			throw new DqlParseException("Expected NULL after IS", p);
		}
		// NOT NULL / NOT EXISTS / NOT IN
		if (match(TokenType.NOT)) {
			if (match(TokenType.NULL)) {
				return new FilterCondition(field, Operator.NOT_NULL, ValueSource.LITERAL, null, false);
			}
			if (match(TokenType.EXISTS)) {
				return new FilterCondition(field, Operator.NOT_EXISTS, ValueSource.LITERAL, null, false);
			}
			if (match(TokenType.IN)) {
				List<Object> arr = parseArray();
				return new FilterCondition(field, Operator.NOT_IN, ValueSource.LITERAL, arr, false);
			}
			throw new DqlParseException("Expected NULL, EXISTS, or IN after NOT", p);
		}
		// EXISTS
		if (match(TokenType.EXISTS)) {
			return new FilterCondition(field, Operator.EXISTS, ValueSource.LITERAL, null, false);
		}
		// Comparison operators
		if (match(TokenType.GT)) {
			Object v = parseValue();
			return new FilterCondition(field, Operator.GT, ValueSource.LITERAL, v, false);
		}
		if (match(TokenType.GTE)) {
			Object v = parseValue();
			return new FilterCondition(field, Operator.GTE, ValueSource.LITERAL, v, false);
		}
		if (match(TokenType.LT)) {
			Object v = parseValue();
			return new FilterCondition(field, Operator.LT, ValueSource.LITERAL, v, false);
		}
		if (match(TokenType.LTE)) {
			Object v = parseValue();
			return new FilterCondition(field, Operator.LTE, ValueSource.LITERAL, v, false);
		}
		// Equality operators
		if (match(TokenType.EQ)) {
			Object v = parseValue();
			return new FilterCondition(field, Operator.EQ, ValueSource.LITERAL, v, false);
		}
		if (match(TokenType.NEQ)) {
			Object v = parseValue();
			return new FilterCondition(field, Operator.NE, ValueSource.LITERAL, v, false);
		}
		// IN / NOT IN
		boolean neg = false;
		if (match(TokenType.NOT)) {
			neg = true;
		}
		if (match(TokenType.IN)) {
			List<Object> arr = parseArray();
			return new FilterCondition(field, neg ? Operator.NOT_IN : Operator.IN, ValueSource.LITERAL, arr, false);
		}
		throw new DqlParseException("Operator expected after field '" + field + "'", p);
	}

	private List<Object> parseArray() {
		expect(TokenType.LBRACK, "'[' expected for IN");
		List<Object> items = new ArrayList<>();
		if (!check(TokenType.RBRACK)) {
			do {
				items.add(parseValue());
			} while (match(TokenType.COMMA));
		}
		expect(TokenType.RBRACK, "']' expected");
		return items;
	}

	private Object parseValue() {
		if (match(TokenType.STRING)) {
			return prev().text;
		}
		if (match(TokenType.NUMBER)) {
			String s = prev().text;
			if (s.contains(".")) {
				return Double.valueOf(s);
			}
			try {
				return Long.valueOf(s);
			} catch (NumberFormatException e) {
				return Double.valueOf(s);
			}
		}
		if (match(TokenType.TRUE)) {
			return Boolean.TRUE;
		}
		if (match(TokenType.FALSE)) {
			return Boolean.FALSE;
		}
		if (match(TokenType.NULL)) {
			return null;
		}
		if (match(TokenType.VAR)) {
			return new VarRef(prev().text);
		}
		if (match(TokenType.DATE_LITERAL)) {
			String text = prev().text;
			try {
				return LocalDate.parse(text);
			} catch (Exception e) {
				throw new DqlParseException("Invalid date literal: '" + text + "'", p);
			}
		}
		if (match(TokenType.DATETIME_LITERAL)) {
			String text = prev().text;
			LocalDateTime ldt = DateTimeConverter.toLocalDateTime(text);
			if (ldt != null) return ldt;
			throw new DqlParseException("Invalid datetime literal: '" + text + "'", p);
		}
		throw new DqlParseException("Value expected", p);
	}

	private boolean match(TokenType tt) {
		if (check(tt)) {
			p++;
			return true;
		}
		return false;
	}

	private boolean check(TokenType tt) {
		return !eof() && peek().type == tt;
	}

	private boolean eof() {
		return p >= t.size();
	}

	private Token peek() {
		return t.get(p);
	}

	private Token prev() {
		return t.get(p - 1);
	}

	private String expectIdent(String msg) {
		if (match(TokenType.IDENT)) {
			return prev().text;
		}
		throw new DqlParseException(msg, p);
	}

	private String expectString(String msg) {
		if (match(TokenType.STRING)) {
			return prev().text;
		}
		throw new DqlParseException(msg, p);
	}

	private void expect(TokenType tt, String msg) {
		if (!match(tt)) {
			throw new DqlParseException(msg, p);
		}
	}

}
