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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @Operation(summary = "Tạo mới dự án")
    public ResponseEntity<ApiResponse<Project>> createProject(@Valid @RequestBody ProjectCreateRequest request) {
        Project created = projectService.createProject(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Tạo dự án thành công", created));
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách tất cả dự án")
    public ResponseEntity<ApiResponse<List<Project>>> getAllProjects(
            @RequestParam(required = false) String memberUserId) {
        List<Project> projects = memberUserId != null
                ? projectService.getProjectsByMember(memberUserId)
                : projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.ok(projects));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết dự án theo ID")
    public ResponseEntity<ApiResponse<Project>> getProjectById(@PathVariable String id) {
        Project project = projectService.getProjectById(id);
        return ResponseEntity.ok(ApiResponse.ok(project));
    }

    @GetMapping("/code/{code}")
    @Operation(summary = "Lấy chi tiết dự án theo mã (ví dụ: WEB)")
    public ResponseEntity<ApiResponse<Project>> getProjectByCode(@PathVariable String code) {
        Project project = projectService.getProjectByCode(code);
        return ResponseEntity.ok(ApiResponse.ok(project));
    }

    @PutMapping("/{id}/settings")
    @Operation(summary = "Cập nhật cấu hình cài đặt dự án (Basic, System, Task Advanced, Custom Fields)")
    public ResponseEntity<ApiResponse<Project>> updateSettings(
            @PathVariable String id,
            @RequestBody Project.ProjectSettings settings) {
        Project updated = projectService.updateProjectSettings(id, settings);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật thiết lập dự án thành công", updated));
    }

    @PostMapping("/{id}/stages")
    @Operation(summary = "Thêm giai đoạn mới cho dự án")
    public ResponseEntity<ApiResponse<Project>> addStage(@PathVariable String id, @RequestParam String stageName) {
        Project updated = projectService.addStage(id, stageName);
        return ResponseEntity.ok(ApiResponse.ok("Thêm giai đoạn thành công", updated));
    }

    @GetMapping("/{id}/tasks")
    @Operation(summary = "Lấy danh sách công việc thuộc dự án")
    public ResponseEntity<ApiResponse<List<Task>>> getProjectTasks(
            @PathVariable String id,
            @RequestParam(required = false) String stageId) {
        List<Task> tasks = stageId != null
                ? taskService.getTasksByProjectAndStage(id, stageId)
                : taskService.getTasksByProject(id);
        return ResponseEntity.ok(ApiResponse.ok(tasks));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa dự án")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa dự án thành công", null));
    }
}
