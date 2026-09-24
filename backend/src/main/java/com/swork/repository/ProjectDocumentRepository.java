package com.swork.repository;

import com.swork.model.entity.ProjectDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectDocumentRepository extends MongoRepository<ProjectDocument, String> {
    List<ProjectDocument> findByProjectIdOrderByCreatedAtDesc(String projectId);
}
