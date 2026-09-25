package com.swork.controller;

import com.swork.common.PageResponse;
import com.swork.model.entity.Task;
import com.swork.model.enums.MyTaskTab;
import com.swork.model.enums.TaskPriority;
import com.swork.model.enums.TaskStatus;
import com.swork.model.request.TaskCreateRequest;
import com.swork.model.request.TaskFilterRequest;
import com.swork.model.request.TaskUpdateRequest;
import com.swork.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@Tag(name = "Tasks", description = "APIs quản lý công việc và 4 tab Công việc cá nhân (My Tasks)")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Tạo mới công việc")
    public Mono<Task> createTask(@Valid @RequestBody TaskCreateRequest request) {
        return taskService.createTask(request);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Cập nhật chi tiết công việc")
    public Mono<Task> updateTask(@PathVariable String id, @RequestBody TaskUpdateRequest request) {
        return taskService.updateTask(id, request);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Cập nhật nhanh trạng thái công việc (TODO, IN_PROGRESS, IN_REVIEW, DONE, FAILED)")
    public Mono<Task> updateStatus(@PathVariable String id, @RequestParam TaskStatus status) {
        return taskService.updateTaskStatus(id, status);
    }

    @PatchMapping("/{id}/checklists/{checkItemId}")
    @Operation(summary = "Đánh dấu hoàn thành / chưa hoàn thành mục checklist")
    public Mono<Task> toggleChecklist(@PathVariable String id,
                                      @PathVariable String checkItemId,
                                      @RequestParam boolean isDone) {
        return taskService.toggleChecklistItem(id, checkItemId, isDone);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết công việc theo ID")
    public Mono<Task> getTaskById(@PathVariable String id) {
        return taskService.getTaskById(id);
    }

    @GetMapping("/key/{taskKey}")
    @Operation(summary = "Lấy chi tiết công việc theo mã (ví dụ: WEB-105)")
    public Mono<Task> getTaskByKey(@PathVariable String taskKey) {
        return taskService.getTaskByKey(taskKey);
    }

    @GetMapping
    @Operation(summary = "Lọc công việc theo 4 tab My Tasks, dự án, giai đoạn, trạng thái, tìm kiếm")
    public Mono<PageResponse<Task>> getTasks(
            @RequestParam(required = false) MyTaskTab tab,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String projectId,
            @RequestParam(required = false) String stageId,
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) TaskPriority priority,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Instant dueDateFrom,
            @RequestParam(required = false) Instant dueDateTo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        TaskFilterRequest filter = TaskFilterRequest.builder()
                .tab(tab)
                .userId(userId)
                .projectId(projectId)
                .stageId(stageId)
                .status(status)
                .priority(priority)
                .search(search)
                .dueDateFrom(dueDateFrom)
                .dueDateTo(dueDateTo)
                .page(page)
                .size(size)
                .build();

        return taskService.getTasksWithFilter(filter);
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "Lấy tất cả công việc của một dự án")
    public Flux<Task> getTasksByProject(@PathVariable String projectId) {
        return taskService.getTasksByProject(projectId);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa công việc")
    public Mono<Void> deleteTask(@PathVariable String id) {
        return taskService.deleteTask(id);
    }
}
