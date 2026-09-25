package com.swork.repository;

import com.swork.model.entity.ProjectDocument;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ProjectDocumentRepository extends ReactiveMongoRepository<ProjectDocument, String> {
    Flux<ProjectDocument> findByProjectIdOrderByCreatedAtDesc(String projectId);
}
