package com.swork.repository;

import com.swork.model.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    Optional<Project> findByCode(String code);

    @Query("{ 'members.user_id': ?0 }")
    List<Project> findByMemberUserId(String userId);

    List<Project> findByDepartmentId(String departmentId);
}
