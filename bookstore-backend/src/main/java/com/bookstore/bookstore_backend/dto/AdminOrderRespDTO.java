package com.bookstore.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminOrderRespDTO {
    private Long orderId;
    private String orderStatus;
    private LocalDateTime orderPlaced;
    private LocalDateTime deliveryDate;
    private BigDecimal totalAmount;
    private String paymentStatus;
    private String paymentMethod;
    private Boolean isActive;

    // User Info
    private Long userId;
    private String userName;
    private String userEmail;
    private String userRole;

    // Address Info
    private Long addressId;
    private String addressLine;
    private String city;
    private String state;
    private String pincode;
    private String landmark;

    // Order Items
    private List<OrderItemSummaryDTO> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemSummaryDTO {
        private Long bookId;
        private String bookTitle;
        private Integer quantity;
        private BigDecimal price;
    }
}
