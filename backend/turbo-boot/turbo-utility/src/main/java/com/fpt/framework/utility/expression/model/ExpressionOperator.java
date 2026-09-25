package com.fpt.framework.utility.expression.model;

public enum ExpressionOperator implements com.fpt.framework.utility.expression.ExpressionOperator {
    IN,
    NOT_IN,
    IS,
    IS_NOT,
    EQ,
    NEQ,
    LT,
    LTE,
    GT,
    GTE,
    REGEX,
    AND,
    OR,
    MATCH,
    TEXT_MATCH;
    @FunctionalInterface
    public interface OperatorBuildFunction<T> {
        T build(String key, Object value);
    }
}
