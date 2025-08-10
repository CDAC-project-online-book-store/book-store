package com.bookstore.bookstore_backend.dto.analytics;

import lombok.Data;

@Data
public class OrderSummaryDTO {
    private int totalOrdersToday;
    private int totalOrdersWeek;
    private int totalOrdersMonth;
    private int pendingOrders;
    private int shippedOrders;
    private int deliveredOrders;
    private int cancelledOrders;
}
