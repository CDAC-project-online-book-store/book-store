package com.bookstore.bookstore_backend.dto.analytics;

import lombok.Data;
import java.util.List;

@Data
public class TopBooksDTO {
    private List<BookSales> topBooks;
    @Data
    public static class BookSales {
        private String title;
        private int quantitySold;
    }
}
