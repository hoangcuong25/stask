package com.swork.service;

import com.swork.model.entity.Worklog;
import com.swork.model.request.WorklogCreateRequest;

import java.util.List;

public interface WorklogService {
    Worklog createWorklog(WorklogCreateRequest request);
    List<Worklog> getWorklogsByTask(String taskId);
    List<Worklog> getWorklogsByProject(String projectId);
    List<Worklog> getWorklogsByUser(String userId);
}
