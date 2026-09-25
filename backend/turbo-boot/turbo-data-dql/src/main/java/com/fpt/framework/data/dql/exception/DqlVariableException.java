package com.fpt.framework.data.dql.exception;

import lombok.Getter;

@Getter
public class DqlVariableException extends DqlException {

    private final String variableName;

    public DqlVariableException(String variableName) {
        super("Cannot resolve variable: $" + variableName);
        this.variableName = variableName;
    }

}
