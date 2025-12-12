package com.example.Greencart.controller;

import com.example.Greencart.entity.User;
import com.example.Greencart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Error: Email already taken!";
        }

        user.setActive(true);

        userRepository.save(user);

        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null) {
            return "Error: User not found!";
        }

        if (!user.getPasswordHash().equals(loginRequest.getPasswordHash())) {
            return "Error: Wrong password!";
        }

        return "Login Successful! Welcome " + user.getFirstName();
    }
}