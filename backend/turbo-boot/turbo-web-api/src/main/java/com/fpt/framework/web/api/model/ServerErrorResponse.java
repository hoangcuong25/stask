package com.fpt.framework.web.api.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ServerErrorResponse {
    private String error;
    private StackTraceElement stackTrace;
}
