package com.swork.repository;

import com.swork.model.entity.Project;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface ProjectRepository extends ReactiveMongoRepository<Project, String> {
    Mono<Project> findByCode(String code);

    @Query("{ 'members.user_id': ?0 }")
    Flux<Project> findByMemberUserId(String userId);

    Flux<Project> findByDepartmentId(String departmentId);
}
