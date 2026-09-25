package com.swork.repository;

import com.swork.model.entity.Task;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface TaskRepository extends ReactiveMongoRepository<Task, String>, TaskRepositoryCustom {
    Mono<Task> findByTaskKey(String taskKey);

    @Query("{ 'project.id': ?0 }")
    Flux<Task> findByProjectId(String projectId);

    @Query("{ 'project.id': ?0, 'stage_id': ?1 }")
    Flux<Task> findByProjectIdAndStageId(String projectId, String stageId);

    @Query(value = "{ 'project.id': ?0 }", count = true)
    Mono<Long> countByProjectId(String projectId);
}
