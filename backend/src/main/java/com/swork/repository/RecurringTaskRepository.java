package com.swork.repository;

import com.swork.model.entity.RecurringTask;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecurringTaskRepository extends MongoRepository<RecurringTask, String> {
    List<RecurringTask> findByProjectId(String projectId);
    List<RecurringTask> findByIsActiveTrue();
}
