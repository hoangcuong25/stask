package com.swork.model.entity;

import com.swork.model.enums.DependencyType;
import com.swork.model.enums.ReviewStatus;
import com.swork.model.enums.TaskPriority;
import com.swork.model.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
@CompoundIndexes({
        @CompoundIndex(name = "project_stage_status_idx", def = "{'project.id': 1, 'stage_id': 1, 'status': 1}"),
        @CompoundIndex(name = "assignee_status_idx", def = "{'assignee.user_id': 1, 'status': 1}")
})
public class Task {

    @Id
    private String id;

    @Indexed(unique = true)
    @TextIndexed
    @Field("task_key")
    private String taskKey;

    @TextIndexed
    private String title;

    private String description;

    private ProjectRef project;

    @Field("stage_id")
    private String stageId;

    @Field("parent_id")
    private String parentId;

    @Builder.Default
    private TaskStatus status = TaskStatus.TODO;

    @Builder.Default
    private TaskPriority priority = TaskPriority.MEDIUM;

    @Field("is_completed")
    @Builder.Default
    private Boolean isCompleted = false;

    @Field("creator_id")
    @Indexed
    private String creatorId;

    private AssigneeRef assignee;

    @Field("collaborator_ids")
    @Indexed
    @Builder.Default
    private List<String> collaboratorIds = new ArrayList<>();

    @Field("follower_ids")
    @Indexed
    @Builder.Default
    private List<String> followerIds = new ArrayList<>();

    @Builder.Default
    private List<ChecklistItem> checklists = new ArrayList<>();

    @Field("checklist_summary")
    private String checklistSummary;

    @Field("start_date")
    private Instant startDate;

    @Field("due_date")
    @Indexed
    private Instant dueDate;

    @Builder.Default
    private Estimation estimation = new Estimation();

    @Builder.Default
    private Dependencies dependencies = new Dependencies();

    @Builder.Default
    private ReviewInfo review = new ReviewInfo();

    @Field("custom_field_values")
    @Builder.Default
    private Map<String, Object> customFieldValues = new HashMap<>();

    @CreatedDate
    @Field("created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Field("updated_at")
    private Instant updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectRef {
        private String id;
        private String name;
        private String code;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AssigneeRef {
        @Field("user_id")
        private String userId;

        @Field("full_name")
        private String fullName;

        @Field("short_name")
        private String shortName;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChecklistItem {
        private String id;
        private String title;

        @Field("is_done")
        @Builder.Default
        private Boolean isDone = false;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Estimation {
        @Field("estimated_hours")
        @Builder.Default
        private Double estimatedHours = 0.0;

        @Field("spent_hours")
        @Builder.Default
        private Double spentHours = 0.0;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Dependencies {
        @Field("blocked_by")
        @Builder.Default
        private List<TaskDependency> blockedBy = new ArrayList<>();

        @Builder.Default
        private List<TaskDependency> blocking = new ArrayList<>();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TaskDependency {
        @Field("task_id")
        private String taskId;

        @Field("task_key")
        private String taskKey;

        private DependencyType type;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewInfo {
        @Field("is_required")
        @Builder.Default
        private Boolean isRequired = false;

        @Field("reviewer_id")
        private String reviewerId;

        @Field("review_status")
        @Builder.Default
        private ReviewStatus reviewStatus = ReviewStatus.PENDING;

        private String feedback;
    }

    public void updateChecklistSummary() {
        if (checklists == null || checklists.isEmpty()) {
            this.checklistSummary = "0/0 checklist";
            return;
        }
        long doneCount = checklists.stream().filter(c -> Boolean.TRUE.equals(c.getIsDone())).count();
        this.checklistSummary = doneCount + "/" + checklists.size() + " checklist";
    }
}
