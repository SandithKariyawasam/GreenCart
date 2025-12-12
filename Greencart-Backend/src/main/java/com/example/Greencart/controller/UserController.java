package com.example.Greencart.controller;

import com.example.Greencart.entity.Address;
import com.example.Greencart.entity.User;
import com.example.Greencart.repository.AddressRepository;
import com.example.Greencart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @GetMapping("/{id}")
    public User getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/{id}")
    public User updateProfile(@PathVariable Long id, @RequestBody User userUpdates) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userUpdates.getFirstName() != null)
            user.setFirstName(userUpdates.getFirstName());
        if (userUpdates.getLastName() != null)
            user.setLastName(userUpdates.getLastName());
        if (userUpdates.getPhoneNumber() != null)
            user.setPhoneNumber(userUpdates.getPhoneNumber());
        if (userUpdates.getProfileImageUrl() != null)
            user.setProfileImageUrl(userUpdates.getProfileImageUrl());

        return userRepository.save(user);
    }

    @PostMapping("/{id}/address")
    public Address addAddress(@PathVariable Long id, @RequestBody Address address) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        address.setUser(user);
        return addressRepository.save(address);
    }

    @GetMapping("/{id}/address")
    public List<Address> getUserAddresses(@PathVariable Long id) {
        return addressRepository.findByUserId(id);
    }
}