package com.swork.controller;

import com.swork.common.ApiResponse;
import com.swork.model.entity.Department;
import com.swork.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
@Tag(name = "Departments", description = "APIs quản lý cơ cấu tổ chức & phòng ban")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách tất cả phòng ban")
    public Mono<ApiResponse<List<Department>>> getAllDepartments() {
        return departmentService.getAllDepartments()
                .collectList()
                .map(ApiResponse::ok);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin phòng ban theo ID")
    public Mono<ApiResponse<Department>> getDepartmentById(@PathVariable String id) {
        return departmentService.getDepartmentById(id)
                .map(ApiResponse::ok);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Tạo phòng ban mới")
    public Mono<ApiResponse<Department>> createDepartment(@RequestBody Department department) {
        return departmentService.createDepartment(department)
                .map(created -> ApiResponse.ok("Tạo phòng ban thành công", created));
    }
}
