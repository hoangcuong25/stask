package com.swork.repository;

import com.swork.model.entity.Worklog;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface WorklogRepository extends ReactiveMongoRepository<Worklog, String> {
    Flux<Worklog> findByTaskIdOrderByWorkDateDesc(String taskId);
    Flux<Worklog> findByProjectIdOrderByWorkDateDesc(String projectId);
    Flux<Worklog> findByUserIdOrderByWorkDateDesc(String userId);
}
