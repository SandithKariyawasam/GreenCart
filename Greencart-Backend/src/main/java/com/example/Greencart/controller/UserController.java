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

    @PutMapping("/{id}")
    public User updateProfile(
            @PathVariable Long id,
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (firstName != null) user.setFirstName(firstName);
        if (lastName != null) user.setLastName(lastName);
        if (phoneNumber != null) user.setPhoneNumber(phoneNumber);

        if (password != null && !password.isEmpty()) {
            user.setPasswordHash(password);
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(imageFile);
            user.setProfileImageUrl(imageUrl);
        }

        return userRepository.save(user);
    }

    @PutMapping("/address/{addressId}")
    public Address updateAddress(@PathVariable Long addressId, @RequestBody Address addressUpdates) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (addressUpdates.getTitle() != null) {
            address.setTitle(addressUpdates.getTitle());
        }
        if (addressUpdates.getAddressLine() != null) {
            address.setAddressLine(addressUpdates.getAddressLine());
        }
        if (addressUpdates.getCity() != null) {
            address.setCity(addressUpdates.getCity());
        }
        if (addressUpdates.getState() != null) {
            address.setState(addressUpdates.getState());
        }
        if (addressUpdates.getZipCode() != null) {
            address.setZipCode(addressUpdates.getZipCode());
        }
        if (addressUpdates.getCountry() != null) {
            address.setCountry(addressUpdates.getCountry());
        }
        if (addressUpdates.getPhoneNumber() != null) {
            address.setPhoneNumber(addressUpdates.getPhoneNumber());
        }

        return addressRepository.save(address);
    }

    // 3. DELETE ADDRESS (New Method)
    @DeleteMapping("/address/{addressId}")
    public void deleteAddress(@PathVariable Long addressId) {
        addressRepository.deleteById(addressId);
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