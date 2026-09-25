package com.swork.service;

import com.swork.model.entity.Worklog;
import com.swork.model.request.WorklogCreateRequest;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface WorklogService {
    Mono<Worklog> createWorklog(WorklogCreateRequest request);
    Flux<Worklog> getWorklogsByTask(String taskId);
    Flux<Worklog> getWorklogsByProject(String projectId);
    Flux<Worklog> getWorklogsByUser(String userId);
}

