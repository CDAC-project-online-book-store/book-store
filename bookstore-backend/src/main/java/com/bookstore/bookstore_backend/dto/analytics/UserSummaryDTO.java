package com.bookstore.bookstore_backend.dto.analytics;

import lombok.Data;
import java.util.List;

@Data
public class UserSummaryDTO {
    private int totalUsers;
    private int newUsersThisMonth;
    private List<TopBuyer> topBuyers;
    @Data
    public static class TopBuyer {
        private String username;
        private double totalSpent;
    }
}
