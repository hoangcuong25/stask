package com.swork.repository;

import com.swork.model.entity.ProjectGoal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectGoalRepository extends MongoRepository<ProjectGoal, String> {
    List<ProjectGoal> findByProjectIdOrderByTargetDateAsc(String projectId);
}
