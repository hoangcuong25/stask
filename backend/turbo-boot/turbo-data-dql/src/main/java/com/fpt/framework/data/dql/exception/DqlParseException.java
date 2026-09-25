package com.fpt.framework.data.dql.exception;

import lombok.Getter;

@Getter
public class DqlParseException extends DqlException {

    private final int position;

    public DqlParseException(String message, int position) {
        super(message + " at pos " + position);
        this.position = position;
    }

}
