package com.example.Greencart.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    
    private Long userId;
    private String shippingAddress;
    private String couponCode;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long productId;
        private int quantity;
    }
}