package com.swork.service;

import com.swork.model.entity.Department;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface DepartmentService {
    Flux<Department> getAllDepartments();
    Mono<Department> getDepartmentById(String id);
    Mono<Department> createDepartment(Department department);
}
