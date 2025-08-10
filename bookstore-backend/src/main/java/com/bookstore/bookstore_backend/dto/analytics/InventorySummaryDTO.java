package com.bookstore.bookstore_backend.dto.analytics;

import lombok.Data;
import java.util.List;

@Data
public class InventorySummaryDTO {
    private int totalBooksInStock;
    private List<LowStockBook> lowStockBooks;
    private List<ZeroSalesBook> zeroSalesBooks;
    @Data
    public static class LowStockBook {
        private String title;
        private int stockQuantity;
    }
    @Data
    public static class ZeroSalesBook {
        private String title;
        private int stockQuantity;
    }
}
