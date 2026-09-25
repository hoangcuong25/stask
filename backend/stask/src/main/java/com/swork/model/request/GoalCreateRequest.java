package com.swork.model.request;

import com.swork.model.enums.GoalStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalCreateRequest {

    @NotBlank(message = "Project ID không được để trống")
    private String projectId;

    @NotBlank(message = "Tiêu đề mục tiêu không được để trống")
    private String title;

    private String description;

    private Instant targetDate;

    @Builder.Default
    private GoalStatus status = GoalStatus.IN_PROGRESS;

    private String ownerId;
}
