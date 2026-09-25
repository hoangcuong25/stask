package com.swork.model.request;

import com.swork.model.entity.Task;
import com.swork.model.enums.ReviewStatus;
import com.swork.model.enums.TaskPriority;
import com.swork.model.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskUpdateRequest {
    private String title;
    private String description;
    private String stageId;
    private TaskStatus status;
    private TaskPriority priority;
    private Boolean isCompleted;
    private String assigneeId;
    private List<String> collaboratorIds;
    private List<String> followerIds;
    private List<Task.ChecklistItem> checklists;
    private Instant startDate;
    private Instant dueDate;
    private Double estimatedHours;
    private Double spentHours;
    private Task.Dependencies dependencies;
    private ReviewUpdateRequest review;
    private Map<String, Object> customFieldValues;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewUpdateRequest {
        private Boolean isRequired;
        private String reviewerId;
        private ReviewStatus reviewStatus;
        private String feedback;
    }
}
