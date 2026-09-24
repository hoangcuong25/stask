package com.swork.controller;

import com.swork.common.ApiResponse;
import com.swork.model.entity.Worklog;
import com.swork.model.request.WorklogCreateRequest;
import com.swork.service.WorklogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/worklogs")
@Tag(name = "Worklogs", description = "APIs quản lý phân hệ Nhật ký chấm giờ (Worklogs)")
public class WorklogController {

    private final WorklogService worklogService;

    public WorklogController(WorklogService worklogService) {
        this.worklogService = worklogService;
    }

    @PostMapping
    @Operation(summary = "Ghi nhận nhật ký chấm giờ làm việc")
    public ResponseEntity<ApiResponse<Worklog>> logTime(@Valid @RequestBody WorklogCreateRequest request) {
        Worklog saved = worklogService.createWorklog(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Ghi nhận giờ làm việc thành công", saved));
    }

    @GetMapping("/task/{taskId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo công việc (Task)")
    public ResponseEntity<ApiResponse<List<Worklog>>> getByTask(@PathVariable String taskId) {
        List<Worklog> list = worklogService.getWorklogsByTask(taskId);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo dự án")
    public ResponseEntity<ApiResponse<List<Worklog>>> getByProject(@PathVariable String projectId) {
        List<Worklog> list = worklogService.getWorklogsByProject(projectId);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo người dùng")
    public ResponseEntity<ApiResponse<List<Worklog>>> getByUser(@PathVariable String userId) {
        List<Worklog> list = worklogService.getWorklogsByUser(userId);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }
}
