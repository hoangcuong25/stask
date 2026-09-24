package com.swork.model.entity;

import com.swork.model.enums.GoalStatus;
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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "project_goals")
public class ProjectGoal {

    @Id
    private String id;

    @Field("project_id")
    private String projectId;

    private String title;

    private String description;

    @Field("target_date")
    private Instant targetDate;

    @Builder.Default
    private GoalStatus status = GoalStatus.IN_PROGRESS;

    @Field("owner_id")
    private String ownerId;

    @CreatedDate
    @Field("created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Field("updated_at")
    private Instant updatedAt;
}
