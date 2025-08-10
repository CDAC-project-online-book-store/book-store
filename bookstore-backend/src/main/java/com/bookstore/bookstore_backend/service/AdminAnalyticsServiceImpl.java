package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.analytics.*;
import org.springframework.stereotype.Service;

@Service
public class AdminAnalyticsServiceImpl implements AdminAnalyticsService {
    @Override
    public OrderSummaryDTO getOrderSummary() {
        // TODO: implement aggregation logic
        return new OrderSummaryDTO();
    }
    @Override
    public TopBooksDTO getTopSellingBooks() {
        // TODO: implement aggregation logic
        return new TopBooksDTO();
    }
    @Override
    public InventorySummaryDTO getInventorySummary() {
        // TODO: implement aggregation logic
        return new InventorySummaryDTO();
    }
    @Override
    public UserSummaryDTO getUserSummary() {
        // TODO: implement aggregation logic
        return new UserSummaryDTO();
    }
    @Override
    public RevenueSummaryDTO getRevenueSummary() {
        // TODO: implement aggregation logic
        return new RevenueSummaryDTO();
    }
}
