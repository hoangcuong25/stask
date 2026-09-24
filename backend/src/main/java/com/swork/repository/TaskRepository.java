package com.swork.repository;

import com.swork.model.entity.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String>, TaskRepositoryCustom {
    Optional<Task> findByTaskKey(String taskKey);

    @Query("{ 'project.id': ?0 }")
    List<Task> findByProjectId(String projectId);

    @Query("{ 'project.id': ?0, 'stage_id': ?1 }")
    List<Task> findByProjectIdAndStageId(String projectId, String stageId);

    long countByProjectId(String projectId);
}
