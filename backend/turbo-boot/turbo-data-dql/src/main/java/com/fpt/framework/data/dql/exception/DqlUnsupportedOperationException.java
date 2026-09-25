package com.fpt.framework.data.dql.exception;

import lombok.Getter;

@Getter
public class DqlUnsupportedOperationException extends DqlException {

    private final String operator;
    private final String hint;

    public DqlUnsupportedOperationException(String operator, String hint) {
        super(buildMessage(operator, hint));
        this.operator = operator;
        this.hint = hint;
    }

	private static String buildMessage(String operator, String hint) {
        String msg = "Operator not supported: " + operator;
        if (hint != null && !hint.isBlank()) {
            msg += ". " + hint;
        }
        return msg;
    }
}
