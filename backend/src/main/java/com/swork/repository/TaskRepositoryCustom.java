package com.swork.repository;

import com.swork.model.entity.Project;
import com.swork.model.entity.Task;
import com.swork.model.request.TaskFilterRequest;
import org.springframework.data.domain.Page;

public interface TaskRepositoryCustom {
    Page<Task> findTasksWithFilter(TaskFilterRequest filter);
    Project.ProjectStats calculateProjectStats(String projectId);
}
