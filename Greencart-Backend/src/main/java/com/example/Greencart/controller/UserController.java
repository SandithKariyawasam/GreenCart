package com.example.Greencart.controller;

import com.example.Greencart.entity.Address;
import com.example.Greencart.entity.User;
import com.example.Greencart.entity.Role;
import com.example.Greencart.repository.AddressRepository;
import com.example.Greencart.repository.UserRepository;
import com.example.Greencart.repository.RoleRepository;
import com.example.Greencart.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping
    public User createUser(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPasswordHash(password);
        user.setPhoneNumber(phoneNumber);

        Role defaultRole = roleRepository.findById(1).orElse(null);

        if (defaultRole != null) {
            user.setRole(defaultRole);
        } else {
            Role newRole = new Role();
            newRole.setId(1);
            newRole.setName("USER");
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(imageFile);
            user.setProfileImageUrl(imageUrl);
        }

        return userRepository.save(user);
    }

    // 2. GET USER PROFILE
    @GetMapping("/{id}")
    public User getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 3. UPDATE PROFILE
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

    // 4. ADD ADDRESS
    @PostMapping("/{id}/address")
    public Address addAddress(@PathVariable Long id, @RequestBody Address address) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        address.setUser(user);
        return addressRepository.save(address);
    }

    // 5. GET ADDRESSES
    @GetMapping("/{id}/address")
    public List<Address> getUserAddresses(@PathVariable Long id) {
        return addressRepository.findByUserId(id);
    }

    // 6. GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}