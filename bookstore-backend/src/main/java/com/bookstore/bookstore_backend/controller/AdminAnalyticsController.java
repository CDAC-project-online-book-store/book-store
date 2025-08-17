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

    /**
     * Returns a summary of orders including total orders today, this week, this month,
     * and counts by status (pending, shipped, delivered, cancelled).
     */
    @GetMapping("/orders/summary")
    public ResponseEntity<OrderSummaryDTO> getOrderSummary() {
        return ResponseEntity.ok(analyticsService.getOrderSummary());
    }

    /**
     * Returns the top selling books based on quantity sold.
     * Useful for identifying popular inventory.
     */
    @GetMapping("/orders/top-books")
    public ResponseEntity<TopBooksDTO> getTopSellingBooks() {
        return ResponseEntity.ok(analyticsService.getTopSellingBooks());
    }

    /**
     * Returns inventory summary including total books in stock,
     * books with low stock, and books with zero sales.
     */
    @GetMapping("/inventory/summary")
    public ResponseEntity<InventorySummaryDTO> getInventorySummary() {
        return ResponseEntity.ok(analyticsService.getInventorySummary());
    }

    /**
     * Returns user summary including total users, new users this month,
     * and top buyers by total spent.
     */
    @GetMapping("/users/summary")
    public ResponseEntity<UserSummaryDTO> getUserSummary() {
        return ResponseEntity.ok(analyticsService.getUserSummary());
    }

    /**
     * Returns revenue summary including total revenue for the current month
     * and all-time revenue from successful payments.
     */
    @GetMapping("/revenue/summary")
    public ResponseEntity<RevenueSummaryDTO> getRevenueSummary() {
        return ResponseEntity.ok(analyticsService.getRevenueSummary());
    }
}
