package com.swork.service.impl;

import com.swork.exception.BusinessException;
import com.swork.exception.ResourceNotFoundException;
import com.swork.common.ErrorCode;
import com.swork.model.entity.Project;
import com.swork.model.request.ProjectCreateRequest;
import com.swork.repository.ProjectRepository;
import com.swork.repository.TaskRepository;
import com.swork.service.ProjectService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public Mono<Project> createProject(ProjectCreateRequest request) {
        String code = request.getCode().toUpperCase();
        return projectRepository.findByCode(code)
                .flatMap(existing -> Mono.<Project>error(
                        new BusinessException(ErrorCode.DUPLICATE_KEY, "Mã dự án " + request.getCode() + " đã tồn tại")))
                .switchIfEmpty(Mono.defer(() -> {
                    List<Project.ProjectStage> stages = request.getStages();
                    if (stages == null || stages.isEmpty()) {
                        stages = new ArrayList<>();
                        stages.add(Project.ProjectStage.builder().id("stage-1").name("Khảo sát & Thiết kế").position(1).build());
                        stages.add(Project.ProjectStage.builder().id("stage-2").name("Phát triển (Sprint)").position(2).build());
                        stages.add(Project.ProjectStage.builder().id("stage-3").name("Kiểm thử & Đánh giá").position(3).build());
                        stages.add(Project.ProjectStage.builder().id("stage-4").name("Nghiệm thu & Bàn giao").position(4).build());
                    }

                    Project project = Project.builder()
                            .name(request.getName())
                            .code(code)
                            .tag(request.getTag())
                            .description(request.getDescription())
                            .departmentId(request.getDepartmentId())
                            .startDate(request.getStartDate())
                            .dueDate(request.getDueDate())
                            .members(request.getMembers() != null ? request.getMembers() : new ArrayList<>())
                            .stages(stages)
                            .settings(request.getSettings() != null ? request.getSettings() : new Project.ProjectSettings())
                            .createdBy(request.getCreatedBy())
                            .build();

                    return projectRepository.save(project);
                }));
    }

    @Override
    public Mono<Project> getProjectById(String id) {
        return projectRepository.findById(id)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Dự án", id)));
    }

    @Override
    public Mono<Project> getProjectByCode(String code) {
        return projectRepository.findByCode(code)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Dự án với mã: " + code)));
    }

    @Override
    public Flux<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Flux<Project> getProjectsByMember(String userId) {
        return projectRepository.findByMemberUserId(userId);
    }

    @Override
    public Mono<Project> updateProjectSettings(String id, Project.ProjectSettings settings) {
        return getProjectById(id)
                .flatMap(project -> {
                    project.setSettings(settings);
                    return projectRepository.save(project);
                });
    }

    @Override
    public Mono<Project> addStage(String id, String stageName) {
        return getProjectById(id)
                .flatMap(project -> {
                    List<Project.ProjectStage> stages = project.getStages();
                    if (stages == null) {
                        stages = new ArrayList<>();
                    }
                    int nextPos = stages.size() + 1;
                    stages.add(Project.ProjectStage.builder()
                            .id("stage-" + UUID.randomUUID().toString().substring(0, 8))
                            .name(stageName)
                            .position(nextPos)
                            .build());
                    project.setStages(stages);
                    return projectRepository.save(project);
                });
    }

    @Override
    public Mono<Void> updateProjectStats(String projectId) {
        return projectRepository.findById(projectId)
                .flatMap(project -> taskRepository.calculateProjectStats(projectId)
                        .flatMap(stats -> {
                            project.setStats(stats);
                            return projectRepository.save(project);
                        }))
                .then();
    }

    @Override
    public Mono<Void> deleteProject(String id) {
        return getProjectById(id)
                .flatMap(projectRepository::delete);
    }
}
