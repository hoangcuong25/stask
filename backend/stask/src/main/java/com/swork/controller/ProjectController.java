package com.swork.controller;

import com.swork.model.entity.Project;
import com.swork.model.entity.Task;
import com.swork.model.request.ProjectCreateRequest;
import com.swork.service.ProjectService;
import com.swork.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "APIs quản lý phân hệ Không gian làm việc & Dự án (Projects Space)")
public class ProjectController {

    private final ProjectService projectService;
    private final TaskService taskService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Tạo mới dự án")
    public Mono<Project> createProject(@Valid @RequestBody ProjectCreateRequest request) {
        return projectService.createProject(request);
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách tất cả dự án")
    public Flux<Project> getAllProjects(@RequestParam(required = false) String memberUserId) {
        return memberUserId != null
                ? projectService.getProjectsByMember(memberUserId)
                : projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết dự án theo ID")
    public Mono<Project> getProjectById(@PathVariable String id) {
        return projectService.getProjectById(id);
    }

    @GetMapping("/code/{code}")
    @Operation(summary = "Lấy chi tiết dự án theo mã (ví dụ: WEB)")
    public Mono<Project> getProjectByCode(@PathVariable String code) {
        return projectService.getProjectByCode(code);
    }

    @PutMapping("/{id}/settings")
    @Operation(summary = "Cập nhật cấu hình cài đặt dự án (Basic, System, Task Advanced, Custom Fields)")
    public Mono<Project> updateSettings(
            @PathVariable String id,
            @RequestBody Project.ProjectSettings settings) {
        return projectService.updateProjectSettings(id, settings);
    }

    @PostMapping("/{id}/stages")
    @Operation(summary = "Thêm giai đoạn mới cho dự án")
    public Mono<Project> addStage(@PathVariable String id, @RequestParam String stageName) {
        return projectService.addStage(id, stageName);
    }

    @GetMapping("/{id}/tasks")
    @Operation(summary = "Lấy danh sách công việc thuộc dự án")
    public Flux<Task> getProjectTasks(
            @PathVariable String id,
            @RequestParam(required = false) String stageId) {
        return stageId != null
                ? taskService.getTasksByProjectAndStage(id, stageId)
                : taskService.getTasksByProject(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa dự án")
    public Mono<Void> deleteProject(@PathVariable String id) {
        return projectService.deleteProject(id);
    }
}
