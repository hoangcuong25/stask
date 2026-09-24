package com.swork.repository;

import com.swork.model.entity.ProjectDiscussion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectDiscussionRepository extends MongoRepository<ProjectDiscussion, String> {
    List<ProjectDiscussion> findByProjectIdOrderByCreatedAtDesc(String projectId);
    List<ProjectDiscussion> findByParentIdOrderByCreatedAtAsc(String parentId);
}
