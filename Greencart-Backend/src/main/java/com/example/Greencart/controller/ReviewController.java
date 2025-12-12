package com.example.Greencart.controller;

import com.example.Greencart.entity.Product;
import com.example.Greencart.entity.Review;
import com.example.Greencart.entity.User;
import com.example.Greencart.repository.ProductRepository;
import com.example.Greencart.repository.ReviewRepository;
import com.example.Greencart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/add")
    public Review addReview(@RequestBody ReviewRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setApproved(false);

        return reviewRepository.save(review);
    }

    @GetMapping("/product/{productId}")
    public List<Review> getProductReviews(@PathVariable Long productId) {
        return reviewRepository.findByProductIdAndIsApprovedTrue(productId);
    }

    @GetMapping("/pending")
    public List<Review> getPendingReviews() {
        return reviewRepository.findByIsApprovedFalse();
    }

    @PutMapping("/{id}/approve")
    public String approveReview(@PathVariable Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setApproved(true);
        reviewRepository.save(review);
        return "Review Approved!";
    }

    @lombok.Data
    static class ReviewRequest {
        private Long userId;
        private Long productId;
        private int rating;
        private String comment;
    }
}