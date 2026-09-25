package com.swork.service;

import com.swork.model.entity.Project;
import com.swork.model.request.ProjectCreateRequest;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectService {
    Mono<Project> createProject(ProjectCreateRequest request);
    Mono<Project> getProjectById(String id);
    Mono<Project> getProjectByCode(String code);
    Flux<Project> getAllProjects();
    Flux<Project> getProjectsByMember(String userId);
    Mono<Project> updateProjectSettings(String id, Project.ProjectSettings settings);
    Mono<Project> addStage(String id, String stageName);
    Mono<Void> updateProjectStats(String projectId);
    Mono<Void> deleteProject(String id);
}
