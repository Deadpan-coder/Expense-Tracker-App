package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ User signup (register)
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        try {
            // Check if email already exists
            if (userService.emailExists(user.getEmail())) {
                return new ResponseEntity<>(HttpStatus.CONFLICT); // 409 Conflict
            }

            User savedUser = userService.register(user); // Using register()
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED); // 201 Created
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500
        }
    }

    // ✅ User login
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {
        try {
            Optional<User> user = userService.login(
                    loginUser.getEmail(),
                    loginUser.getPassword()
            );

            if (user.isPresent()) {
                return new ResponseEntity<>(user.get(), HttpStatus.OK); // 200 OK
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // 401 Unauthorized
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500
        }
    }
}
