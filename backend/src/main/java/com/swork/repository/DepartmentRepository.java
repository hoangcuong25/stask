package com.swork.repository;

import com.swork.model.entity.Department;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends MongoRepository<Department, String> {
    Optional<Department> findByCode(String code);
    List<Department> findByParentId(String parentId);
    List<Department> findByIsActiveTrue();
}
