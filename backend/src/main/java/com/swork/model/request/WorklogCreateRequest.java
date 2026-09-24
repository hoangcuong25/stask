package com.swork.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorklogCreateRequest {

    @NotNull(message = "Task ID không được để trống")
    private String taskId;

    private String projectId;

    @NotNull(message = "User ID không được để trống")
    private String userId;

    @NotNull(message = "Thời lượng (phút) không được để trống")
    private Integer durationMinutes;

    private Instant workDate;

    private String note;
}
