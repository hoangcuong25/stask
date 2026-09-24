package com.swork.repository;

import com.swork.model.entity.Worklog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorklogRepository extends MongoRepository<Worklog, String> {
    List<Worklog> findByTaskIdOrderByWorkDateDesc(String taskId);
    List<Worklog> findByProjectIdOrderByWorkDateDesc(String projectId);
    List<Worklog> findByUserIdOrderByWorkDateDesc(String userId);
}
