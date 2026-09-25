package com.swork.repository;

import com.swork.model.entity.ActivityLog;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ActivityLogRepository extends ReactiveMongoRepository<ActivityLog, String> {
    Flux<ActivityLog> findByTargetIdOrderByCreatedAtDesc(String targetId);
}
