package com.swork.repository;

import com.swork.model.entity.CalendarEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarEventRepository extends MongoRepository<CalendarEvent, String> {
    List<CalendarEvent> findByUserIdOrderByStartTimeAsc(String userId);
    List<CalendarEvent> findByProjectIdOrderByStartTimeAsc(String projectId);
}
