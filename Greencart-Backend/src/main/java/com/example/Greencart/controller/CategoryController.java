package com.example.Greencart.controller;

import com.example.Greencart.entity.Category;
import com.example.Greencart.repository.CategoryRepository;
import com.example.Greencart.service.CloudinaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping
    public Category createCategory(
            @RequestParam("name") String name,
            @RequestParam(value = "icon", required = false) String icon,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {

        Category category = new Category();
        category.setName(name);
        category.setIcon(icon); // Save the selected icon

        // Upload Image to Cloudinary if provided
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(imageFile);
            category.setImageUrl(imageUrl);
        }

        return categoryRepository.save(category);
    }

    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable Integer id,
            @RequestParam("name") String name,
            @RequestParam(value = "icon", required = false) String icon,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) throws IOException {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(name);
        category.setIcon(icon);

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(imageFile);
            category.setImageUrl(imageUrl);
        }

        return categoryRepository.save(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
        try {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok("Category deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Cannot delete this category because it contains products.");
        }
    }
}