package com.swork.service.impl;

import com.swork.common.PageResponse;
import com.swork.exception.ResourceNotFoundException;
import com.swork.model.entity.Project;
import com.swork.model.entity.Task;
import com.swork.model.entity.User;
import com.swork.model.enums.TaskStatus;
import com.swork.model.request.TaskCreateRequest;
import com.swork.model.request.TaskFilterRequest;
import com.swork.model.request.TaskUpdateRequest;
import com.swork.repository.ProjectRepository;
import com.swork.repository.TaskRepository;
import com.swork.repository.UserRepository;
import com.swork.service.ProjectService;
import com.swork.service.TaskService;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectService projectService;

    public TaskServiceImpl(TaskRepository taskRepository,
                           ProjectRepository projectRepository,
                           UserRepository userRepository,
                           @Lazy ProjectService projectService) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.projectService = projectService;
    }

    @Override
    @Transactional
    public Task createTask(TaskCreateRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Dự án", request.getProjectId()));

        // Sinh task_key tự động ví dụ: WEB-101
        long currentCount = taskRepository.countByProjectId(project.getId());
        String taskKey = String.format("%s-%03d", project.getCode(), currentCount + 101);

        Task.TaskBuilder builder = Task.builder()
                .taskKey(taskKey)
                .title(request.getTitle())
                .description(request.getDescription())
                .project(Task.ProjectRef.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .code(project.getCode())
                        .build())
                .stageId(request.getStageId())
                .parentId(request.getParentId())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .priority(request.getPriority())
                .isCompleted(request.getStatus() == TaskStatus.DONE)
                .creatorId(request.getCreatorId())
                .collaboratorIds(request.getCollaboratorIds() != null ? request.getCollaboratorIds() : new ArrayList<>())
                .followerIds(request.getFollowerIds() != null ? request.getFollowerIds() : new ArrayList<>())
                .startDate(request.getStartDate())
                .dueDate(request.getDueDate())
                .customFieldValues(request.getCustomFieldValues());

        // Assignee
        if (StringUtils.hasText(request.getAssigneeId())) {
            userRepository.findById(request.getAssigneeId()).ifPresent(user ->
                    builder.assignee(Task.AssigneeRef.builder()
                            .userId(user.getId())
                            .fullName(user.getFullName())
                            .shortName(user.getShortName())
                            .build())
            );
        }

        // Checklists
        List<Task.ChecklistItem> checklistItems = new ArrayList<>();
        if (request.getChecklistTitles() != null) {
            for (String itemTitle : request.getChecklistTitles()) {
                checklistItems.add(Task.ChecklistItem.builder()
                        .id(UUID.randomUUID().toString())
                        .title(itemTitle)
                        .isDone(false)
                        .build());
            }
        }
        builder.checklists(checklistItems);

        // Estimation
        if (request.getEstimatedHours() != null) {
            builder.estimation(Task.Estimation.builder()
                    .estimatedHours(request.getEstimatedHours())
                    .spentHours(0.0)
                    .build());
        }

        Task task = builder.build();
        task.updateChecklistSummary();

        Task saved = taskRepository.save(task);

        // Cập nhật thống kê tiến độ dự án
        projectService.updateProjectStats(project.getId());

        return saved;
    }

    @Override
    @Transactional
    public Task updateTask(String id, TaskUpdateRequest request) {
        Task task = getTaskById(id);

        if (StringUtils.hasText(request.getTitle())) {
            task.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }
        if (request.getStageId() != null) {
            task.setStageId(request.getStageId());
        }
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
            task.setIsCompleted(request.getStatus() == TaskStatus.DONE);
        }
        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }
        if (request.getIsCompleted() != null) {
            task.setIsCompleted(request.getIsCompleted());
            if (Boolean.TRUE.equals(request.getIsCompleted())) {
                task.setStatus(TaskStatus.DONE);
            }
        }

        // Cập nhật Assignee
        if (request.getAssigneeId() != null) {
            if (request.getAssigneeId().isEmpty()) {
                task.setAssignee(null);
            } else {
                userRepository.findById(request.getAssigneeId()).ifPresent(user ->
                        task.setAssignee(Task.AssigneeRef.builder()
                                .userId(user.getId())
                                .fullName(user.getFullName())
                                .shortName(user.getShortName())
                                .build())
                );
            }
        }

        if (request.getCollaboratorIds() != null) {
            task.setCollaboratorIds(request.getCollaboratorIds());
        }
        if (request.getFollowerIds() != null) {
            task.setFollowerIds(request.getFollowerIds());
        }
        if (request.getChecklists() != null) {
            task.setChecklists(request.getChecklists());
        }
        if (request.getStartDate() != null) {
            task.setStartDate(request.getStartDate());
        }
        if (request.getDueDate() != null) {
            task.setDueDate(request.getDueDate());
        }
        if (request.getEstimatedHours() != null || request.getSpentHours() != null) {
            Task.Estimation est = task.getEstimation() != null ? task.getEstimation() : new Task.Estimation();
            if (request.getEstimatedHours() != null) est.setEstimatedHours(request.getEstimatedHours());
            if (request.getSpentHours() != null) est.setSpentHours(request.getSpentHours());
            task.setEstimation(est);
        }
        if (request.getDependencies() != null) {
            task.setDependencies(request.getDependencies());
        }
        if (request.getReview() != null) {
            Task.ReviewInfo rev = task.getReview() != null ? task.getReview() : new Task.ReviewInfo();
            if (request.getReview().getIsRequired() != null) rev.setIsRequired(request.getReview().getIsRequired());
            if (request.getReview().getReviewerId() != null) rev.setReviewerId(request.getReview().getReviewerId());
            if (request.getReview().getReviewStatus() != null) rev.setReviewStatus(request.getReview().getReviewStatus());
            if (request.getReview().getFeedback() != null) rev.setFeedback(request.getReview().getFeedback());
            task.setReview(rev);
        }
        if (request.getCustomFieldValues() != null) {
            task.setCustomFieldValues(request.getCustomFieldValues());
        }

        task.updateChecklistSummary();
        Task saved = taskRepository.save(task);

        if (task.getProject() != null && task.getProject().getId() != null) {
            projectService.updateProjectStats(task.getProject().getId());
        }

        return saved;
    }

    @Override
    @Transactional
    public Task updateTaskStatus(String id, TaskStatus newStatus) {
        Task task = getTaskById(id);
        task.setStatus(newStatus);
        task.setIsCompleted(newStatus == TaskStatus.DONE);
        Task saved = taskRepository.save(task);

        if (task.getProject() != null && task.getProject().getId() != null) {
            projectService.updateProjectStats(task.getProject().getId());
        }
        return saved;
    }

    @Override
    @Transactional
    public Task toggleChecklistItem(String taskId, String checkItemId, boolean isDone) {
        Task task = getTaskById(taskId);
        if (task.getChecklists() != null) {
            for (Task.ChecklistItem item : task.getChecklists()) {
                if (item.getId() != null && item.getId().equals(checkItemId)) {
                    item.setIsDone(isDone);
                    break;
                }
            }
            task.updateChecklistSummary();
            return taskRepository.save(task);
        }
        return task;
    }

    @Override
    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Công việc (Task)", id));
    }

    @Override
    public Task getTaskByKey(String taskKey) {
        return taskRepository.findByTaskKey(taskKey)
                .orElseThrow(() -> new ResourceNotFoundException("Công việc (Task)", taskKey));
    }

    @Override
    public PageResponse<Task> getTasksWithFilter(TaskFilterRequest filter) {
        Page<Task> page = taskRepository.findTasksWithFilter(filter);
        return PageResponse.from(page);
    }

    @Override
    public List<Task> getTasksByProject(String projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Override
    public List<Task> getTasksByProjectAndStage(String projectId, String stageId) {
        return taskRepository.findByProjectIdAndStageId(projectId, stageId);
    }

    @Override
    @Transactional
    public void deleteTask(String id) {
        Task task = getTaskById(id);
        String projectId = task.getProject() != null ? task.getProject().getId() : null;
        taskRepository.deleteById(id);
        if (projectId != null) {
            projectService.updateProjectStats(projectId);
        }
    }
}
