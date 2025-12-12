package com.example.Greencart.repository;

import com.example.Greencart.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProductIdAndIsApprovedTrue(Long productId);

    List<Review> findByIsApprovedFalse();
}