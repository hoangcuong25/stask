package com.swork.service.impl;

import com.swork.common.PageResponse;
import com.swork.exception.ResourceNotFoundException;
import com.swork.model.entity.Project;
import com.swork.model.entity.Task;
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
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    public Mono<Task> createTask(TaskCreateRequest request) {
        return projectRepository.findById(request.getProjectId())
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Dự án", request.getProjectId())))
                .flatMap(project -> taskRepository.countByProjectId(project.getId())
                        .defaultIfEmpty(0L)
                        .flatMap(currentCount -> {
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

                            Mono<Task> taskMono;
                            if (StringUtils.hasText(request.getAssigneeId())) {
                                taskMono = userRepository.findById(request.getAssigneeId())
                                        .map(user -> builder.assignee(Task.AssigneeRef.builder()
                                                .userId(user.getId())
                                                .fullName(user.getFullName())
                                                .shortName(user.getShortName())
                                                .build()).build())
                                        .defaultIfEmpty(builder.build());
                            } else {
                                taskMono = Mono.just(builder.build());
                            }

                            return taskMono.flatMap(task -> {
                                task.updateChecklistSummary();
                                return taskRepository.save(task)
                                        .flatMap(saved -> projectService.updateProjectStats(project.getId())
                                                .thenReturn(saved));
                            });
                        }));
    }

    @Override
    public Mono<Task> updateTask(String id, TaskUpdateRequest request) {
        return getTaskById(id)
                .flatMap(task -> {
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

                    Mono<Task> applyAssigneeMono;
                    if (request.getAssigneeId() != null) {
                        if (request.getAssigneeId().isEmpty()) {
                            task.setAssignee(null);
                            applyAssigneeMono = Mono.just(task);
                        } else {
                            applyAssigneeMono = userRepository.findById(request.getAssigneeId())
                                    .map(user -> {
                                        task.setAssignee(Task.AssigneeRef.builder()
                                                .userId(user.getId())
                                                .fullName(user.getFullName())
                                                .shortName(user.getShortName())
                                                .build());
                                        return task;
                                    })
                                    .defaultIfEmpty(task);
                        }
                    } else {
                        applyAssigneeMono = Mono.just(task);
                    }

                    return applyAssigneeMono.flatMap(t -> {
                        t.updateChecklistSummary();
                        return taskRepository.save(t)
                                .flatMap(saved -> {
                                    if (saved.getProject() != null && saved.getProject().getId() != null) {
                                        return projectService.updateProjectStats(saved.getProject().getId())
                                                .thenReturn(saved);
                                    }
                                    return Mono.just(saved);
                                });
                    });
                });
    }

    @Override
    public Mono<Task> updateTaskStatus(String id, TaskStatus newStatus) {
        return getTaskById(id)
                .flatMap(task -> {
                    task.setStatus(newStatus);
                    task.setIsCompleted(newStatus == TaskStatus.DONE);
                    return taskRepository.save(task)
                            .flatMap(saved -> {
                                if (saved.getProject() != null && saved.getProject().getId() != null) {
                                    return projectService.updateProjectStats(saved.getProject().getId())
                                            .thenReturn(saved);
                                }
                                return Mono.just(saved);
                            });
                });
    }

    @Override
    public Mono<Task> toggleChecklistItem(String taskId, String checkItemId, boolean isDone) {
        return getTaskById(taskId)
                .flatMap(task -> {
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
                    return Mono.just(task);
                });
    }

    @Override
    public Mono<Task> getTaskById(String id) {
        return taskRepository.findById(id)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Công việc (Task)", id)));
    }

    @Override
    public Mono<Task> getTaskByKey(String taskKey) {
        return taskRepository.findByTaskKey(taskKey)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Công việc (Task)", taskKey)));
    }

    @Override
    public Mono<PageResponse<Task>> getTasksWithFilter(TaskFilterRequest filter) {
        return taskRepository.findTasksWithFilter(filter);
    }

    @Override
    public Flux<Task> getTasksByProject(String projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Override
    public Flux<Task> getTasksByProjectAndStage(String projectId, String stageId) {
        return taskRepository.findByProjectIdAndStageId(projectId, stageId);
    }

    @Override
    public Mono<Void> deleteTask(String id) {
        return getTaskById(id)
                .flatMap(task -> {
                    String projectId = task.getProject() != null ? task.getProject().getId() : null;
                    return taskRepository.deleteById(id)
                            .then(projectId != null ? projectService.updateProjectStats(projectId) : Mono.empty());
                });
    }
}
