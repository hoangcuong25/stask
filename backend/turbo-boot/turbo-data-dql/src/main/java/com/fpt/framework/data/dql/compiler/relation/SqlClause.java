package com.fpt.framework.data.dql.compiler.relation;

import java.util.List;

class SqlClause {

	private final String fieldPath;
	private String condition;
	private boolean ignoreCase;

	private SqlClause(String fieldPath) {
		this.fieldPath = fieldPath;
	}

	static SqlClause field(String fieldPath) {
		return new SqlClause(fieldPath);
	}

	SqlClause isNull() {
		this.condition = fieldPath + " IS NULL";
		return this;
	}

	SqlClause isNotNull() {
		this.condition = fieldPath + " IS NOT NULL";
		return this;
	}

	SqlClause eq(String param) {
		this.condition = fieldPath + " = :" + param;
		return this;
	}

	SqlClause ne(String param) {
		this.condition = fieldPath + " != :" + param;
		return this;
	}

	SqlClause gt(String param) {
		this.condition = fieldPath + " > :" + param;
		return this;
	}

	SqlClause gte(String param) {
		this.condition = fieldPath + " >= :" + param;
		return this;
	}

	SqlClause lt(String param) {
		this.condition = fieldPath + " < :" + param;
		return this;
	}

	SqlClause lte(String param) {
		this.condition = fieldPath + " <= :" + param;
		return this;
	}

	SqlClause like(String param) {
		this.condition = fieldPath + " LIKE :" + param;
		return this;
	}

	SqlClause notLike(String param) {
		this.condition = fieldPath + " NOT LIKE :" + param;
		return this;
	}

	SqlClause in(List<String> params) {
		this.condition = fieldPath + " IN (" + String.join(", ", params) + ")";
		return this;
	}

	SqlClause notIn(List<String> params) {
		this.condition = fieldPath + " NOT IN (" + String.join(", ", params) + ")";
		return this;
	}

	SqlClause ignoreCase() {
		this.ignoreCase = true;
		return this;
	}

	String toSql() {
		if (ignoreCase && condition != null) {
			if (condition.contains(fieldPath + " LIKE :")) {
				return condition.replace(fieldPath + " LIKE :", "LOWER(" + fieldPath + ") LIKE LOWER(:") + ")";
			}
			if (condition.contains(fieldPath + " NOT LIKE :")) {
				return condition.replace(fieldPath + " NOT LIKE :", "LOWER(" + fieldPath + ") NOT LIKE LOWER(:") + ")";
			}
			if (condition.contains(fieldPath + " = :")) {
				return condition.replace(fieldPath + " = :", "LOWER(" + fieldPath + ") = LOWER(:") + ")";
			}
			if (condition.contains(fieldPath + " != :")) {
				return condition.replace(fieldPath + " != :", "LOWER(" + fieldPath + ") != LOWER(:") + ")";
			}
		}
		return condition;
	}
}
