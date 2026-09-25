package com.swork.controller;

import com.swork.common.ApiResponse;
import com.swork.model.entity.Project;
import com.swork.model.entity.Task;
import com.swork.model.request.ProjectCreateRequest;
import com.swork.service.ProjectService;
import com.swork.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@Tag(name = "Projects", description = "APIs quản lý phân hệ Không gian làm việc & Dự án (Projects Space)")
public class ProjectController {

    private final ProjectService projectService;
    private final TaskService taskService;

    public ProjectController(ProjectService projectService, TaskService taskService) {
        this.projectService = projectService;
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Tạo mới dự án")
    public Mono<ApiResponse<Project>> createProject(@Valid @RequestBody ProjectCreateRequest request) {
        return projectService.createProject(request)
                .map(created -> ApiResponse.ok("Tạo dự án thành công", created));
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách tất cả dự án")
    public Mono<ApiResponse<List<Project>>> getAllProjects(
            @RequestParam(required = false) String memberUserId) {
        return (memberUserId != null
                ? projectService.getProjectsByMember(memberUserId)
                : projectService.getAllProjects())
                .collectList()
                .map(ApiResponse::ok);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết dự án theo ID")
    public Mono<ApiResponse<Project>> getProjectById(@PathVariable String id) {
        return projectService.getProjectById(id)
                .map(ApiResponse::ok);
    }

    @GetMapping("/code/{code}")
    @Operation(summary = "Lấy chi tiết dự án theo mã (ví dụ: WEB)")
    public Mono<ApiResponse<Project>> getProjectByCode(@PathVariable String code) {
        return projectService.getProjectByCode(code)
                .map(ApiResponse::ok);
    }

    @PutMapping("/{id}/settings")
    @Operation(summary = "Cập nhật cấu hình cài đặt dự án (Basic, System, Task Advanced, Custom Fields)")
    public Mono<ApiResponse<Project>> updateSettings(
            @PathVariable String id,
            @RequestBody Project.ProjectSettings settings) {
        return projectService.updateProjectSettings(id, settings)
                .map(updated -> ApiResponse.ok("Cập nhật thiết lập dự án thành công", updated));
    }

    @PostMapping("/{id}/stages")
    @Operation(summary = "Thêm giai đoạn mới cho dự án")
    public Mono<ApiResponse<Project>> addStage(@PathVariable String id, @RequestParam String stageName) {
        return projectService.addStage(id, stageName)
                .map(updated -> ApiResponse.ok("Thêm giai đoạn thành công", updated));
    }

    @GetMapping("/{id}/tasks")
    @Operation(summary = "Lấy danh sách công việc thuộc dự án")
    public Mono<ApiResponse<List<Task>>> getProjectTasks(
            @PathVariable String id,
            @RequestParam(required = false) String stageId) {
        return (stageId != null
                ? taskService.getTasksByProjectAndStage(id, stageId)
                : taskService.getTasksByProject(id))
                .collectList()
                .map(ApiResponse::ok);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa dự án")
    public Mono<ApiResponse<Void>> deleteProject(@PathVariable String id) {
        return projectService.deleteProject(id)
                .thenReturn(ApiResponse.ok("Xóa dự án thành công", null));
    }
}
