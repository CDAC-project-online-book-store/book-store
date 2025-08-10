package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.analytics.*;

public interface AdminAnalyticsService {
    OrderSummaryDTO getOrderSummary();
    TopBooksDTO getTopSellingBooks();
    InventorySummaryDTO getInventorySummary();
    UserSummaryDTO getUserSummary();
    RevenueSummaryDTO getRevenueSummary();
}
