package com.bookstore.bookstore_backend.controller;

import com.bookstore.bookstore_backend.dto.analytics.*;
import com.bookstore.bookstore_backend.service.AdminAnalyticsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600) // Allow all origins, adjust as needed
@RestController
@RequestMapping("/admin/analytics")
@AllArgsConstructor
public class AdminAnalyticsController {

	private final AdminAnalyticsService analyticsService;

    // 1. Orders summary (total, by status, today/week/month)
    @GetMapping("/orders/summary")
    public ResponseEntity<OrderSummaryDTO> getOrderSummary() {
        return ResponseEntity.ok(analyticsService.getOrderSummary());
    }

    // 2. Top 5 selling books
    @GetMapping("/orders/top-books")
    public ResponseEntity<TopBooksDTO> getTopSellingBooks() {
        return ResponseEntity.ok(analyticsService.getTopSellingBooks());
    }

    // 3. Inventory summary
    @GetMapping("/inventory/summary")
    public ResponseEntity<InventorySummaryDTO> getInventorySummary() {
        return ResponseEntity.ok(analyticsService.getInventorySummary());
    }

    // 4. User summary
    @GetMapping("/users/summary")
    public ResponseEntity<UserSummaryDTO> getUserSummary() {
        return ResponseEntity.ok(analyticsService.getUserSummary());
    }

    // 5. Revenue summary
    @GetMapping("/revenue/summary")
    public ResponseEntity<RevenueSummaryDTO> getRevenueSummary() {
        return ResponseEntity.ok(analyticsService.getRevenueSummary());
    }
}
