package com.fpt.framework.data.dql.exception;

public abstract class DqlException extends RuntimeException {

    protected DqlException(String message) {
        super(message);
    }

    protected DqlException(String message, Throwable cause) {
        super(message, cause);
    }
}
