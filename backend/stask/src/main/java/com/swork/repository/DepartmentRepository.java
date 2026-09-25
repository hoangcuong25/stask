package com.swork.repository;

import com.swork.model.entity.Department;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface DepartmentRepository extends ReactiveMongoRepository<Department, String> {
    Mono<Department> findByCode(String code);
    Flux<Department> findByParentId(String parentId);
    Flux<Department> findByIsActiveTrue();
}
