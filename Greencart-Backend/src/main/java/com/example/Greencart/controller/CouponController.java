package com.example.Greencart.controller;

import com.example.Greencart.entity.Coupon;
import com.example.Greencart.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "*")
public class CouponController {

    @Autowired
    private CouponRepository couponRepository;

    @PostMapping
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        if (couponRepository.findByCode(coupon.getCode()).isPresent()) {
            throw new RuntimeException("Coupon code already exists!");
        }
        return couponRepository.save(coupon);
    }

    @GetMapping
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    @GetMapping("/validate/{code}")
    public Coupon validateCoupon(@PathVariable String code) {
        Coupon coupon = couponRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Invalid Coupon Code"));

        if (coupon.getExpiryDate().isBefore(java.time.LocalDate.now())) {
            throw new RuntimeException("Coupon has expired");
        }

        return coupon;
    }

    @DeleteMapping("/{id}")
    public String deleteCoupon(@PathVariable Long id) {
        couponRepository.deleteById(id);
        return "Coupon deleted successfully";
    }
}