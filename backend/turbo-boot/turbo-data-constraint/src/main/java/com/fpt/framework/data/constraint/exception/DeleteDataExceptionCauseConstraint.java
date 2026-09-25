package com.fpt.framework.data.constraint.exception;

import com.fpt.framework.data.exception.DataException;

public class DeleteDataExceptionCauseConstraint extends DataException {
    public DeleteDataExceptionCauseConstraint(String resource, String message) {
        super(resource, message);
    }
}
