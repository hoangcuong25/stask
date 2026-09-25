package com.swork.repository;

import com.swork.model.entity.RecurringTask;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface RecurringTaskRepository extends ReactiveMongoRepository<RecurringTask, String> {
    Flux<RecurringTask> findByProjectId(String projectId);
    Flux<RecurringTask> findByIsActiveTrue();
}
