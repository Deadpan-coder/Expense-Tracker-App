package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    // Register user (stores password as plain text)
    public User register(User user) {
        return userRepo.save(user);
    }

    // Login user by matching email and password directly
    public Optional<User> login(String email, String password) {
        return userRepo.findByEmailAndPassword(email, password);
    }
}

