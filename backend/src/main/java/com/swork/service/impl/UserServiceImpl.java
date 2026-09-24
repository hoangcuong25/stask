package com.swork.service.impl;

import com.swork.exception.ResourceNotFoundException;
import com.swork.model.entity.User;
import com.swork.repository.UserRepository;
import com.swork.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng", id));
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }
}
