package com.example.Greencart.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class DashboardStats {
    private long totalUsers;
    private long totalProducts;
    private long totalOrders;
    private BigDecimal totalRevenue;
}
