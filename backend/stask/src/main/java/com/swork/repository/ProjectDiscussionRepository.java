package com.swork.repository;

import com.swork.model.entity.ProjectDiscussion;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ProjectDiscussionRepository extends ReactiveMongoRepository<ProjectDiscussion, String> {
    Flux<ProjectDiscussion> findByProjectIdOrderByCreatedAtDesc(String projectId);
    Flux<ProjectDiscussion> findByParentIdOrderByCreatedAtAsc(String parentId);
}
