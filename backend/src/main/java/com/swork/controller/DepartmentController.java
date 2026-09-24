package com.swork.controller;

import com.swork.common.ApiResponse;
import com.swork.model.entity.Department;
import com.swork.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<ApiResponse<List<Department>>> getAllDepartments() {
        return ResponseEntity.ok(ApiResponse.ok(departmentService.getAllDepartments()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin phòng ban theo ID")
    public ResponseEntity<ApiResponse<Department>> getDepartmentById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(departmentService.getDepartmentById(id)));
    }

    @PostMapping
    @Operation(summary = "Tạo phòng ban mới")
    public ResponseEntity<ApiResponse<Department>> createDepartment(@RequestBody Department department) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Tạo phòng ban thành công", departmentService.createDepartment(department)));
    }
}
