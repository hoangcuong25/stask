package com.swork.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "worklogs")
@CompoundIndexes({
        @CompoundIndex(name = "user_workdate_idx", def = "{'user_id': 1, 'work_date': -1}"),
        @CompoundIndex(name = "project_workdate_idx", def = "{'project_id': 1, 'work_date': -1}")
})
public class Worklog {

    @Id
    private String id;

    @Field("task_id")
    private String taskId;

    @Field("project_id")
    private String projectId;

    @Field("user_id")
    private String userId;

    @Field("duration_minutes")
    private Integer durationMinutes;

    @Field("work_date")
    private Instant workDate;

    private String note;

    @CreatedDate
    @Field("created_at")
    private Instant createdAt;
}
