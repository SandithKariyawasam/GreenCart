package com.example.Greencart.controller;

import com.example.Greencart.entity.Category;
import com.example.Greencart.entity.Product;
import com.example.Greencart.repository.CategoryRepository;
import com.example.Greencart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Integer categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        Category category = categoryRepository.findById(product.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        product.setCategory(category);
        return productRepository.save(product);
    }
}