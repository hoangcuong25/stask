package com.swork.repository;

import com.swork.model.entity.ProjectGoal;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ProjectGoalRepository extends ReactiveMongoRepository<ProjectGoal, String> {
    Flux<ProjectGoal> findByProjectIdOrderByTargetDateAsc(String projectId);
}
