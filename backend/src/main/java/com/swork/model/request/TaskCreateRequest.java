package com.swork.model.request;

import com.swork.model.enums.TaskPriority;
import com.swork.model.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskCreateRequest {

    @NotBlank(message = "Tiêu đề công việc không được để trống")
    private String title;

    private String description;

    @NotBlank(message = "Dự án không được để trống")
    private String projectId;

    private String stageId;

    private String parentId;

    @Builder.Default
    private TaskStatus status = TaskStatus.TODO;

    @Builder.Default
    private TaskPriority priority = TaskPriority.MEDIUM;

    private String creatorId;

    private String assigneeId;

    @Builder.Default
    private List<String> collaboratorIds = new ArrayList<>();

    @Builder.Default
    private List<String> followerIds = new ArrayList<>();

    @Builder.Default
    private List<String> checklistTitles = new ArrayList<>();

    private Instant startDate;

    private Instant dueDate;

    private Double estimatedHours;

    @Builder.Default
    private Map<String, Object> customFieldValues = new HashMap<>();
}
