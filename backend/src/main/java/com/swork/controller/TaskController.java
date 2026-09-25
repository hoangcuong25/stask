package com.swork.controller;

import com.swork.common.ApiResponse;
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
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@Tag(name = "Tasks", description = "APIs quản lý công việc và 4 tab Công việc cá nhân (My Tasks)")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Tạo mới công việc")
    public Mono<ApiResponse<Task>> createTask(@Valid @RequestBody TaskCreateRequest request) {
        return taskService.createTask(request)
                .map(created -> ApiResponse.ok("Tạo công việc thành công", created));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Cập nhật chi tiết công việc")
    public Mono<ApiResponse<Task>> updateTask(@PathVariable String id, @RequestBody TaskUpdateRequest request) {
        return taskService.updateTask(id, request)
                .map(updated -> ApiResponse.ok("Cập nhật công việc thành công", updated));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Cập nhật nhanh trạng thái công việc (TODO, IN_PROGRESS, IN_REVIEW, DONE, FAILED)")
    public Mono<ApiResponse<Task>> updateStatus(@PathVariable String id, @RequestParam TaskStatus status) {
        return taskService.updateTaskStatus(id, status)
                .map(updated -> ApiResponse.ok("Cập nhật trạng thái thành công", updated));
    }

    @PatchMapping("/{id}/checklists/{checkItemId}")
    @Operation(summary = "Đánh dấu hoàn thành / chưa hoàn thành mục checklist")
    public Mono<ApiResponse<Task>> toggleChecklist(@PathVariable String id,
                                                    @PathVariable String checkItemId,
                                                    @RequestParam boolean isDone) {
        return taskService.toggleChecklistItem(id, checkItemId, isDone)
                .map(updated -> ApiResponse.ok("Cập nhật checklist thành công", updated));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết công việc theo ID")
    public Mono<ApiResponse<Task>> getTaskById(@PathVariable String id) {
        return taskService.getTaskById(id)
                .map(ApiResponse::ok);
    }

    @GetMapping("/key/{taskKey}")
    @Operation(summary = "Lấy chi tiết công việc theo mã (ví dụ: WEB-105)")
    public Mono<ApiResponse<Task>> getTaskByKey(@PathVariable String taskKey) {
        return taskService.getTaskByKey(taskKey)
                .map(ApiResponse::ok);
    }

    @GetMapping
    @Operation(summary = "Lọc công việc theo 4 tab My Tasks, dự án, giai đoạn, trạng thái, tìm kiếm")
    public Mono<ApiResponse<PageResponse<Task>>> getTasks(
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

        return taskService.getTasksWithFilter(filter)
                .map(ApiResponse::ok);
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "Lấy tất cả công việc của một dự án")
    public Mono<ApiResponse<List<Task>>> getTasksByProject(@PathVariable String projectId) {
        return taskService.getTasksByProject(projectId)
                .collectList()
                .map(ApiResponse::ok);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa công việc")
    public Mono<ApiResponse<Void>> deleteTask(@PathVariable String id) {
        return taskService.deleteTask(id)
                .thenReturn(ApiResponse.ok("Xóa công việc thành công", null));
    }
}
