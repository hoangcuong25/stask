package com.swork.service.impl;

import com.swork.exception.ResourceNotFoundException;
import com.swork.model.entity.Department;
import com.swork.repository.DepartmentRepository;
import com.swork.service.DepartmentService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public Flux<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Mono<Department> getDepartmentById(String id) {
        return departmentRepository.findById(id)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Phòng ban", id)));
    }

    @Override
    public Mono<Department> createDepartment(Department department) {
        return departmentRepository.save(department);
    }
}
