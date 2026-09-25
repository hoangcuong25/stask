package com.swork.repository;

import com.swork.model.entity.CalendarEvent;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface CalendarEventRepository extends ReactiveMongoRepository<CalendarEvent, String> {
    Flux<CalendarEvent> findByUserIdOrderByStartTimeAsc(String userId);
    Flux<CalendarEvent> findByProjectIdOrderByStartTimeAsc(String projectId);
}
