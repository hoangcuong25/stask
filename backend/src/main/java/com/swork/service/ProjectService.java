package com.swork.service;

import com.swork.model.entity.Project;
import com.swork.model.request.ProjectCreateRequest;

import java.util.List;

public interface ProjectService {
    Project createProject(ProjectCreateRequest request);
    Project getProjectById(String id);
    Project getProjectByCode(String code);
    List<Project> getAllProjects();
    List<Project> getProjectsByMember(String userId);
    Project updateProjectSettings(String id, Project.ProjectSettings settings);
    Project addStage(String id, String stageName);
    void updateProjectStats(String projectId);
    void deleteProject(String id);
}
