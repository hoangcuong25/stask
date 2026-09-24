package com.swork.exception;

import com.swork.common.ErrorCode;

public class ResourceNotFoundException extends BusinessException {
    public ResourceNotFoundException(String resourceName, String id) {
        super(ErrorCode.RESOURCE_NOT_FOUND, String.format("%s không tồn tại với ID: %s", resourceName, id));
    }

    public ResourceNotFoundException(String message) {
        super(ErrorCode.RESOURCE_NOT_FOUND, message);
    }
}
