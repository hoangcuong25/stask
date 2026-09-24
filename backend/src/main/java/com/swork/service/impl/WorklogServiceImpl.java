package com.swork.service.impl;

import com.swork.exception.ResourceNotFoundException;
import com.swork.model.entity.Task;
import com.swork.model.entity.Worklog;
import com.swork.model.request.WorklogCreateRequest;
import com.swork.repository.TaskRepository;
import com.swork.repository.WorklogRepository;
import com.swork.service.WorklogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class WorklogServiceImpl implements WorklogService {

    private final WorklogRepository worklogRepository;
    private final TaskRepository taskRepository;

    public WorklogServiceImpl(WorklogRepository worklogRepository, TaskRepository taskRepository) {
        this.worklogRepository = worklogRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional
    public Worklog createWorklog(WorklogCreateRequest request) {
        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Công việc (Task)", request.getTaskId()));

        String projectId = request.getProjectId();
        if (projectId == null && task.getProject() != null) {
            projectId = task.getProject().getId();
        }

        Worklog worklog = Worklog.builder()
                .taskId(task.getId())
                .projectId(projectId)
                .userId(request.getUserId())
                .durationMinutes(request.getDurationMinutes())
                .workDate(request.getWorkDate() != null ? request.getWorkDate() : Instant.now())
                .note(request.getNote())
                .build();

        Worklog saved = worklogRepository.save(worklog);

        // Cập nhật số giờ thực tế đã làm vào task
        Task.Estimation est = task.getEstimation() != null ? task.getEstimation() : new Task.Estimation();
        double addedHours = request.getDurationMinutes() / 60.0;
        est.setSpentHours((est.getSpentHours() != null ? est.getSpentHours() : 0.0) + addedHours);
        task.setEstimation(est);
        taskRepository.save(task);

        return saved;
    }

    @Override
    public List<Worklog> getWorklogsByTask(String taskId) {
        return worklogRepository.findByTaskIdOrderByWorkDateDesc(taskId);
    }

    @Override
    public List<Worklog> getWorklogsByProject(String projectId) {
        return worklogRepository.findByProjectIdOrderByWorkDateDesc(projectId);
    }

    @Override
    public List<Worklog> getWorklogsByUser(String userId) {
        return worklogRepository.findByUserIdOrderByWorkDateDesc(userId);
    }
}
