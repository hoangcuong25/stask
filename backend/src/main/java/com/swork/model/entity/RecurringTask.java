package com.swork.model.entity;

import com.swork.model.enums.TaskPriority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recurring_tasks")
public class RecurringTask {

    @Id
    private String id;

    private String title;

    @Field("project_id")
    private String projectId;

    @Field("assignee_id")
    private String assigneeId;

    @Field("cron_expression")
    private String cronExpression;

    @Field("task_template")
    private TaskTemplate taskTemplate;

    @Field("is_active")
    @Builder.Default
    private Boolean isActive = true;

    @Field("next_run_at")
    private Instant nextRunAt;

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
    public static class TaskTemplate {
        @Builder.Default
        private TaskPriority priority = TaskPriority.MEDIUM;

        @Builder.Default
        private List<TemplateChecklistItem> checklists = new ArrayList<>();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TemplateChecklistItem {
        private String title;

        @Field("is_done")
        @Builder.Default
        private Boolean isDone = false;
    }
}
