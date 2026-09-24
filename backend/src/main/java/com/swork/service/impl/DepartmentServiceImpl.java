package com.swork.service.impl;

import com.swork.exception.ResourceNotFoundException;
import com.swork.model.entity.Department;
import com.swork.repository.DepartmentRepository;
import com.swork.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Department getDepartmentById(String id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Phòng ban", id));
    }

    @Override
    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }
}
