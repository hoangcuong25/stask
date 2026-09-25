package com.swork.service.impl;

import com.swork.exception.ResourceNotFoundException;
import com.swork.model.entity.User;
import com.swork.repository.UserRepository;
import com.swork.service.UserService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Flux<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Mono<User> getUserById(String id) {
        return userRepository.findById(id)
                .switchIfEmpty(Mono.error(new ResourceNotFoundException("Người dùng", id)));
    }

    @Override
    public Mono<User> createUser(User user) {
        return userRepository.save(user);
    }
}
