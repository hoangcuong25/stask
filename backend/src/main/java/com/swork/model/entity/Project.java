package com.swork.model.entity;

import com.swork.model.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String code;

    private String tag;

    private String description;

    @Field("department_id")
    private String departmentId;

    @Field("start_date")
    private Instant startDate;

    @Field("due_date")
    private Instant dueDate;

    @Builder.Default
    private ProjectStats stats = new ProjectStats();

    @Builder.Default
    private List<ProjectMember> members = new ArrayList<>();

    @Builder.Default
    private List<ProjectStage> stages = new ArrayList<>();

    @Builder.Default
    private ProjectSettings settings = new ProjectSettings();

    @Field("created_by")
    private String createdBy;

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
    public static class ProjectStats {
        @Field("total_tasks")
        @Builder.Default
        private Integer totalTasks = 0;

        @Field("completed_tasks")
        @Builder.Default
        private Integer completedTasks = 0;

        @Field("in_progress_tasks")
        @Builder.Default
        private Integer inProgressTasks = 0;

        @Field("todo_tasks")
        @Builder.Default
        private Integer todoTasks = 0;

        @Field("progress_percent")
        @Builder.Default
        private Double progressPercent = 0.0;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectMember {
        @Field("user_id")
        private String userId;

        @Field("full_name")
        private String fullName;

        @Field("short_name")
        private String shortName;

        private ProjectRole role;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectStage {
        private String id;
        private String name;
        private Integer position;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectSettings {
        @Field("basic_settings")
        @Builder.Default
        private BasicSettings basicSettings = new BasicSettings();

        @Field("system_settings")
        @Builder.Default
        private SystemSettings systemSettings = new SystemSettings();

        @Field("task_advanced_settings")
        @Builder.Default
        private TaskAdvancedSettings taskAdvancedSettings = new TaskAdvancedSettings();

        @Field("custom_field_definitions")
        @Builder.Default
        private List<CustomFieldDefinition> customFieldDefinitions = new ArrayList<>();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BasicSettings {
        @Field("access_permission")
        @Builder.Default
        private AccessPermission accessPermission = AccessPermission.ALL_MEMBERS;

        @Field("manager_can_add_members")
        @Builder.Default
        private Boolean managerCanAddMembers = true;

        @Field("enable_custom_fields")
        @Builder.Default
        private Boolean enableCustomFields = true;

        @Field("send_email_notifications")
        @Builder.Default
        private Boolean sendEmailNotifications = true;

        @Field("enable_goals")
        @Builder.Default
        private Boolean enableGoals = true;

        @Field("allow_clone_workspace")
        @Builder.Default
        private Boolean allowCloneWorkspace = true;

        @Field("is_closed")
        @Builder.Default
        private Boolean isClosed = false;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SystemSettings {
        @Field("allow_convert_type")
        @Builder.Default
        private Boolean allowConvertType = false;

        @Field("is_template")
        @Builder.Default
        private Boolean isTemplate = true;

        @Field("pin_to_sidebar")
        @Builder.Default
        private Boolean pinToSidebar = true;

        @Field("delete_permission")
        @Builder.Default
        private DeletePermission deletePermission = DeletePermission.SYSTEM_OWNER_ONLY;

        @Field("owner_can_view_all")
        @Builder.Default
        private Boolean ownerCanViewAll = true;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TaskAdvancedSettings {
        @Field("enable_hourly_deadline")
        @Builder.Default
        private Boolean enableHourlyDeadline = true;

        @Field("task_view_scope")
        @Builder.Default
        private TaskViewScope taskViewScope = TaskViewScope.ALL_TASKS;

        @Field("require_review_before_complete")
        @Builder.Default
        private Boolean requireReviewBeforeComplete = true;

        @Field("review_by_stages")
        @Builder.Default
        private ReviewByStages reviewByStages = new ReviewByStages();

        @Field("show_subtasks_in_list")
        @Builder.Default
        private Boolean showSubtasksInList = true;

        @Field("assignee_can_edit_info")
        @Builder.Default
        private Boolean assigneeCanEditInfo = false;

        @Field("task_delete_permission")
        @Builder.Default
        private DeletePermission taskDeletePermission = DeletePermission.CREATOR_AND_MANAGER;

        @Field("enable_failed_status")
        @Builder.Default
        private Boolean enableFailedStatus = false;

        @Field("enable_batch_actions")
        @Builder.Default
        private Boolean enableBatchActions = true;

        @Field("enable_estimated_hours")
        @Builder.Default
        private Boolean enableEstimatedHours = true;

        @Field("enable_task_dependencies")
        @Builder.Default
        private Boolean enableTaskDependencies = true;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewByStages {
        @Builder.Default
        private Boolean enabled = false;

        @Field("stage_ids")
        @Builder.Default
        private List<String> stageIds = new ArrayList<>();
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CustomFieldDefinition {
        private String key;
        private String label;
        private CustomFieldType type;

        @Field("is_required")
        @Builder.Default
        private Boolean isRequired = false;
    }
}
