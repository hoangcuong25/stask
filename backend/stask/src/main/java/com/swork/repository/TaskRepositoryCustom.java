package com.swork.repository;

import com.swork.common.PageResponse;
import com.swork.model.entity.Project;
import com.swork.model.entity.Task;
import com.swork.model.request.TaskFilterRequest;
import reactor.core.publisher.Mono;

public interface TaskRepositoryCustom {
    Mono<PageResponse<Task>> findTasksWithFilter(TaskFilterRequest filter);
    Mono<Project.ProjectStats> calculateProjectStats(String projectId);
}
