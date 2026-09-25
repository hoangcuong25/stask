package com.swork.model.request;

import com.swork.model.enums.MyTaskTab;
import com.swork.model.enums.TaskPriority;
import com.swork.model.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskFilterRequest {
    private MyTaskTab tab;
    private String userId;
    private String projectId;
    private String stageId;
    private TaskStatus status;
    private TaskPriority priority;
    private String search;
    private Instant dueDateFrom;
    private Instant dueDateTo;

    @Builder.Default
    private int page = 0;

    @Builder.Default
    private int size = 20;
}
