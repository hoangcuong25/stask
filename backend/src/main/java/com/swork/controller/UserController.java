package com.swork.controller;

import com.swork.common.ApiResponse;
import com.swork.model.entity.User;
import com.swork.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "APIs quản lý hồ sơ người dùng & tài khoản")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách người dùng")
    public Mono<ApiResponse<List<User>>> getAllUsers() {
        return userService.getAllUsers()
                .collectList()
                .map(ApiResponse::ok);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy thông tin người dùng theo ID")
    public Mono<ApiResponse<User>> getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(ApiResponse::ok);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Tạo người dùng mới")
    public Mono<ApiResponse<User>> createUser(@RequestBody User user) {
        return userService.createUser(user)
                .map(created -> ApiResponse.ok("Tạo người dùng thành công", created));
    }
}
