package com.fpt.framework.data.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DataException  extends RuntimeException {
    protected String resource;
    protected String code;

    public DataException(String resource, String code, String message) {
        super(String.format("Code %s, data %s, %s", code, resource, message));
        this.resource = resource;
        this.code = code;
    }

    public DataException(String resource, String message) {
        super(String.format("Data %s, %s", resource, message));
        this.resource = resource;
    }

    public DataException(String message) {
        super(message);
    }
}