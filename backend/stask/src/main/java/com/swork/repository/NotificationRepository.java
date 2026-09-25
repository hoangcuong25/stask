package com.swork.repository;

import com.swork.model.entity.Notification;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface NotificationRepository extends ReactiveMongoRepository<Notification, String> {
    Flux<Notification> findByUserIdOrderByCreatedAtDesc(String userId);
    Mono<Long> countByUserIdAndIsReadFalse(String userId);
}
