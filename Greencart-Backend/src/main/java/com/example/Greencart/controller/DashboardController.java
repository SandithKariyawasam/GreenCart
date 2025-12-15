package com.example.Greencart.controller;

import com.example.Greencart.dto.DashboardStats;
import com.example.Greencart.entity.Order;
import com.example.Greencart.repository.OrderRepository;
import com.example.Greencart.repository.ProductRepository;
import com.example.Greencart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/stats")
    public DashboardStats getDashboardStats() {
        DashboardStats stats = new DashboardStats();
        stats.setTotalUsers(userRepository.count());
        stats.setTotalProducts(productRepository.count());
        stats.setTotalOrders(orderRepository.count());

        List<Order> allOrders = orderRepository.findAll();
        BigDecimal revenue = allOrders.stream()
                .map(Order::getTotalAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        stats.setTotalRevenue(revenue);

        return stats;
    }

    @GetMapping("/analytics")
    public Map<String, Object> getDashboardAnalytics() {
        Map<String, Object> response = new HashMap<>();

        // 1. Revenue Chart Data (Simulated)
        response.put("revenueData", List.of(1500, 2300, 3200, 2800, 4500, 5000, 4800, 6100, 7500));

        // 2. Best Selling Products (THIS WAS MISSING causing the error!)
        response.put("bestSelling", productRepository.findAll().stream().limit(5).collect(Collectors.toList()));

        // 3. Recent Orders Table
        List<Map<String, Object>> recentOrders = orderRepository.findAll().stream()
                .sorted((o1, o2) -> o2.getId().compareTo(o1.getId()))
                .limit(5)
                .map(order -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("orderId", "#" + order.getId());

                    String productName = "Unknown Product";
                    if (order.getOrderItems() != null && !order.getOrderItems().isEmpty()) {
                        productName = order.getOrderItems().get(0).getProduct().getName();
                    }
                    map.put("productName", productName);

                    map.put("date", order.getOrderDate() != null ? order.getOrderDate().toLocalDate().toString()
                            : java.time.LocalDate.now().toString());

                    map.put("price", "$" + order.getTotalAmount());
                    map.put("status", order.getStatus() != null ? order.getStatus() : "Pending");
                    map.put("payment", "Paid");
                    return map;
                })
                .collect(Collectors.toList());
        response.put("recentOrders", recentOrders);

        // 4. Earning Chart Data
        Map<String, List<Integer>> earningSeries = new HashMap<>();
        earningSeries.put("series1", List.of(35, 40, 60, 42, 30, 37, 36, 50, 32, 35));
        earningSeries.put("series2", List.of(85, 57, 74, 99, 48, 61, 47, 81, 57, 44));
        response.put("earningSeries", earningSeries);

        // --- ROW 3 DATA ---
        List<Map<String, Object>> transactions = orderRepository.findAll().stream()
                .sorted((o1, o2) -> o2.getId().compareTo(o1.getId()))
                .limit(5)
                .map(order -> {
                    Map<String, Object> trans = new HashMap<>();
                    trans.put("title", "Order #" + order.getId());
                    trans.put("sub", "User ID: " + order.getUser().getId());
                    trans.put("amount", "+$" + order.getTotalAmount());
                    trans.put("type", "credit");
                    trans.put("icon", "ri-shopping-cart-2-line");
                    trans.put("color", "green");
                    return trans;
                })
                .collect(Collectors.toList());
        response.put("recentTransactions", transactions);

        response.put("visitorStats", List.of(35, 25, 15, 25));

        return response;
    }
}