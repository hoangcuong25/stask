package com.swork.controller;

import com.swork.model.entity.Worklog;
import com.swork.model.request.WorklogCreateRequest;
import com.swork.service.WorklogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/worklogs")
@RequiredArgsConstructor
@Tag(name = "Worklogs", description = "APIs quản lý phân hệ Nhật ký chấm giờ (Worklogs)")
public class WorklogController {

    private final WorklogService worklogService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Ghi nhận nhật ký chấm giờ làm việc")
    public Mono<Worklog> logTime(@Valid @RequestBody WorklogCreateRequest request) {
        return worklogService.createWorklog(request);
    }

    @GetMapping("/task/{taskId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo công việc (Task)")
    public Flux<Worklog> getByTask(@PathVariable String taskId) {
        return worklogService.getWorklogsByTask(taskId);
    }

    @GetMapping("/project/{projectId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo dự án")
    public Flux<Worklog> getByProject(@PathVariable String projectId) {
        return worklogService.getWorklogsByProject(projectId);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Lấy lịch sử chấm giờ theo người dùng")
    public Flux<Worklog> getByUser(@PathVariable String userId) {
        return worklogService.getWorklogsByUser(userId);
    }
}
