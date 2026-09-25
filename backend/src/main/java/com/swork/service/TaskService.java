package com.swork.service;

import com.swork.common.PageResponse;
import com.swork.model.entity.Task;
import com.swork.model.enums.TaskStatus;
import com.swork.model.request.TaskCreateRequest;
import com.swork.model.request.TaskFilterRequest;
import com.swork.model.request.TaskUpdateRequest;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TaskService {
    Mono<Task> createTask(TaskCreateRequest request);
    Mono<Task> updateTask(String id, TaskUpdateRequest request);
    Mono<Task> updateTaskStatus(String id, TaskStatus newStatus);
    Mono<Task> toggleChecklistItem(String taskId, String checkItemId, boolean isDone);
    Mono<Task> getTaskById(String id);
    Mono<Task> getTaskByKey(String taskKey);
    Mono<PageResponse<Task>> getTasksWithFilter(TaskFilterRequest filter);
    Flux<Task> getTasksByProject(String projectId);
    Flux<Task> getTasksByProjectAndStage(String projectId, String stageId);
    Mono<Void> deleteTask(String id);
}

