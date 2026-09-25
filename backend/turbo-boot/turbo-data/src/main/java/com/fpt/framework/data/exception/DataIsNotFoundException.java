package com.fpt.framework.data.exception;

public class DataIsNotFoundException extends DataException {
    public DataIsNotFoundException(String resource, String message) {
        super(resource, "Not found: %s".formatted(message));
        this.resource = resource;
    }

    public DataIsNotFoundException(String message) {
        super(message);
    }
}
