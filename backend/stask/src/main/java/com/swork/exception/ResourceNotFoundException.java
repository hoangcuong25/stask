package com.swork.exception;

import com.fpt.framework.data.exception.DataIsNotFoundException;

public class ResourceNotFoundException extends DataIsNotFoundException {
    public ResourceNotFoundException(String resourceName, String id) {
        super(resourceName, String.format("%s không tồn tại với ID: %s", resourceName, id));
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
