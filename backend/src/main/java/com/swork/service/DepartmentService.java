package com.swork.service;

import com.swork.model.entity.Department;

import java.util.List;

public interface DepartmentService {
    List<Department> getAllDepartments();
    Department getDepartmentById(String id);
    Department createDepartment(Department department);
}
