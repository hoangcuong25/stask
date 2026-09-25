package com.swork.service;

import com.swork.model.entity.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {
    Flux<User> getAllUsers();
    Mono<User> getUserById(String id);
    Mono<User> createUser(User user);
}
