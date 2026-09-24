package com.swork.service;

import com.swork.common.PageResponse;
import com.swork.model.entity.Task;
import com.swork.model.enums.TaskStatus;
import com.swork.model.request.TaskCreateRequest;
import com.swork.model.request.TaskFilterRequest;
import com.swork.model.request.TaskUpdateRequest;

import java.util.List;

public interface TaskService {
    Task createTask(TaskCreateRequest request);
    Task updateTask(String id, TaskUpdateRequest request);
    Task updateTaskStatus(String id, TaskStatus newStatus);
    Task toggleChecklistItem(String taskId, String checkItemId, boolean isDone);
    Task getTaskById(String id);
    Task getTaskByKey(String taskKey);
    PageResponse<Task> getTasksWithFilter(TaskFilterRequest filter);
    List<Task> getTasksByProject(String projectId);
    List<Task> getTasksByProjectAndStage(String projectId, String stageId);
    void deleteTask(String id);
}
