package com.swork.controller;

import com.swork.model.entity.Department;
import com.swork.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
@Tag(name = "Departments", description = "APIs quản lý cơ cấu tổ chức & phòng ban")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    @Operation(summary = "Lấy danh sách tất cả phòng ban")
    public Flux<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin phòng ban theo ID")
    public Mono<Department> getDepartmentById(@PathVariable String id) {
        return departmentService.getDepartmentById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Tạo phòng ban mới")
    public Mono<Department> createDepartment(@RequestBody Department department) {
        return departmentService.createDepartment(department);
    }
}
