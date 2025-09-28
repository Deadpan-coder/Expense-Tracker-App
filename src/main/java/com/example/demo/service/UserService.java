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

    // Register new user (plain-text password)
    public User register(User user) {
        return userRepo.save(user);
    }

    // Login user by email and password (plain-text)
    public Optional<User> login(String email, String password) {
        return userRepo.findByEmailAndPassword(email, password);
    }

    // Check if email already exists
    public boolean emailExists(String email) {
        return userRepo.findByEmail(email).isPresent();
    }
}
