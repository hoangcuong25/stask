package com.swork.repository;

import com.swork.model.entity.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {
    List<ActivityLog> findByTargetIdOrderByCreatedAtDesc(String targetId);
}
