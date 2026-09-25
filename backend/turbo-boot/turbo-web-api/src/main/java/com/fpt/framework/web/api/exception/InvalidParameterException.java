package com.fpt.framework.web.api.exception;

public class InvalidParameterException extends  RuntimeException {
    private final String name;

    public InvalidParameterException(String name, String message) {
        super(message);
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
