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
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Project createProject(ProjectCreateRequest request) {
        if (projectRepository.findByCode(request.getCode()).isPresent()) {
            throw new BusinessException(ErrorCode.DUPLICATE_KEY, "Mã dự án " + request.getCode() + " đã tồn tại");
        }

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
                .code(request.getCode().toUpperCase())
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
    }

    @Override
    public Project getProjectById(String id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dự án", id));
    }

    @Override
    public Project getProjectByCode(String code) {
        return projectRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Dự án với mã: " + code));
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<Project> getProjectsByMember(String userId) {
        return projectRepository.findByMemberUserId(userId);
    }

    @Override
    @Transactional
    public Project updateProjectSettings(String id, Project.ProjectSettings settings) {
        Project project = getProjectById(id);
        project.setSettings(settings);
        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public Project addStage(String id, String stageName) {
        Project project = getProjectById(id);
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
    }

    @Override
    @Transactional
    public void updateProjectStats(String projectId) {
        projectRepository.findById(projectId).ifPresent(project -> {
            Project.ProjectStats stats = taskRepository.calculateProjectStats(projectId);
            project.setStats(stats);
            projectRepository.save(project);
        });
    }

    @Override
    @Transactional
    public void deleteProject(String id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }
}
