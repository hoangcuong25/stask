package com.swork.controller;

import com.swork.common.ApiResponse;
import com.swork.model.entity.Worklog;
import com.swork.model.request.WorklogCreateRequest;
import com.swork.service.WorklogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

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
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Ghi nhận nhật ký chấm giờ làm việc")
    public Mono<ApiResponse<Worklog>> logTime(@Valid @RequestBody WorklogCreateRequest request) {
        return worklogService.createWorklog(request)
                .map(saved -> ApiResponse.ok("Ghi nhận giờ làm việc thành công", saved));
    }

    @GetMapping("/task/{taskId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo công việc (Task)")
    public Mono<ApiResponse<List<Worklog>>> getByTask(@PathVariable String taskId) {
        return worklogService.getWorklogsByTask(taskId)
                .collectList()
                .map(ApiResponse::ok);
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo dự án")
    public Mono<ApiResponse<List<Worklog>>> getByProject(@PathVariable String projectId) {
        return worklogService.getWorklogsByProject(projectId)
                .collectList()
                .map(ApiResponse::ok);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo người dùng")
    public Mono<ApiResponse<List<Worklog>>> getByUser(@PathVariable String userId) {
        return worklogService.getWorklogsByUser(userId)
                .collectList()
                .map(ApiResponse::ok);
    }
}
