package com.fpt.framework.data.dql.model;

import com.fpt.framework.data.dql.exception.DqlUnsupportedOperationException;

public enum Operator {
	EQ, NE, IN, NOT_IN,
	GT, GTE, LT, LTE,
	LIKE, NOT_LIKE, STARTS_WITH, ENDS_WITH,
	IS_NULL, NOT_NULL, EXISTS, NOT_EXISTS;

	public String toSql() {
		return switch (this) {
			case EQ -> "=";
			case NE -> "!=";
			case GT -> ">";
			case GTE -> ">=";
			case LT -> "<";
			case LTE -> "<=";
			default -> throw new DqlUnsupportedOperationException(this.name(), "No SQL infix operator mapping for this operator");
		};
	}
}
