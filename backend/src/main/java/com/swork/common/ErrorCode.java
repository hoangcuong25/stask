package com.swork.common;

import lombok.Getter;

@Getter
public enum ErrorCode {
    RESOURCE_NOT_FOUND("SWORK-404", "Tài nguyên không tồn tại"),
    BAD_REQUEST("SWORK-400", "Yêu cầu không hợp lệ"),
    DUPLICATE_KEY("SWORK-409", "Mã hoặc khóa đã tồn tại trong hệ thống"),
    INTERNAL_SERVER_ERROR("SWORK-500", "Lỗi xử lý máy chủ nội bộ");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
