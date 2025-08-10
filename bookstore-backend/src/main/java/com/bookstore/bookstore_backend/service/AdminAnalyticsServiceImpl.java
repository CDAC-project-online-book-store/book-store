package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.analytics.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import com.bookstore.bookstore_backend.dao.OrderDao;
import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dao.OrderItemDao;
import com.bookstore.bookstore_backend.dao.PaymentDao;

@Service
public class AdminAnalyticsServiceImpl implements AdminAnalyticsService {
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private BookDao bookDao;
    @Autowired
    private OrderItemDao orderItemDao;
    @Autowired
    private PaymentDao paymentDao;
    @Override
    public OrderSummaryDTO getOrderSummary() {
        OrderSummaryDTO dto = new OrderSummaryDTO();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfToday = now.toLocalDate().atStartOfDay();
        LocalDateTime startOfWeek = now.minusDays(now.getDayOfWeek().getValue() - 1).toLocalDate().atStartOfDay();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).toLocalDate().atStartOfDay();

        // Fetch all orders (could be optimized with custom queries)
        var allOrders = orderDao.findAll();
        dto.setTotalOrdersToday((int) allOrders.stream().filter(o -> o.getOrderDate() != null && o.getOrderDate().isAfter(startOfToday)).count());
        dto.setTotalOrdersWeek((int) allOrders.stream().filter(o -> o.getOrderDate() != null && o.getOrderDate().isAfter(startOfWeek)).count());
        dto.setTotalOrdersMonth((int) allOrders.stream().filter(o -> o.getOrderDate() != null && o.getOrderDate().isAfter(startOfMonth)).count());
        dto.setPendingOrders((int) allOrders.stream().filter(o -> o.getOrderStatus() == com.bookstore.bookstore_backend.entities.OrderStatus.PENDING).count());
        dto.setShippedOrders((int) allOrders.stream().filter(o -> o.getOrderStatus() == com.bookstore.bookstore_backend.entities.OrderStatus.SHIPPED).count());
        dto.setDeliveredOrders((int) allOrders.stream().filter(o -> o.getOrderStatus() == com.bookstore.bookstore_backend.entities.OrderStatus.DELIVERED).count());
        dto.setCancelledOrders((int) allOrders.stream().filter(o -> o.getOrderStatus() == com.bookstore.bookstore_backend.entities.OrderStatus.CANCELLED).count());
        return dto;
    }
    @Transactional(readOnly = true)
    @Override
    public TopBooksDTO getTopSellingBooks() {
            var items = orderItemDao.findAll();
            var bookSalesMap = new java.util.HashMap<String, Integer>();
            for (var item : items) {
                if (item.getBook() != null) {
                    String title = item.getBook().getTitle();
                    bookSalesMap.put(title, bookSalesMap.getOrDefault(title, 0) + item.getQuantity());
                }
            }
            var topBooks = bookSalesMap.entrySet().stream()
                .sorted((e1, e2) -> Integer.compare(e2.getValue(), e1.getValue()))
                .limit(10)
                .map(e -> {
                    TopBooksDTO.BookSales bs = new TopBooksDTO.BookSales();
                    bs.setTitle(e.getKey());
                    bs.setQuantitySold(e.getValue());
                    return bs;
                })
                .toList();
            TopBooksDTO dto = new TopBooksDTO();
            dto.setTopBooks(topBooks);
            return dto;
    }
    
    @Override
    public InventorySummaryDTO getInventorySummary() {
            var books = bookDao.findByIsActiveTrue();
            InventorySummaryDTO dto = new InventorySummaryDTO();
            dto.setTotalBooksInStock(books.stream().mapToInt(b -> b.getStockQuantity() != null ? b.getStockQuantity() : 0).sum());

            // Low stock books (threshold: 5)
            var lowStockBooks = books.stream()
                .filter(b -> b.getStockQuantity() != null && b.getStockQuantity() > 0 && b.getStockQuantity() <= 5)
                .map(b -> {
                    InventorySummaryDTO.LowStockBook lsb = new InventorySummaryDTO.LowStockBook();
                    lsb.setTitle(b.getTitle());
                    lsb.setStockQuantity(b.getStockQuantity());
                    return lsb;
                })
                .toList();
            dto.setLowStockBooks(lowStockBooks);

            // Zero sales books
            var items = orderItemDao.findAll();
            var soldBookIds = items.stream()
                .filter(i -> i.getBook() != null)
                .map(i -> i.getBook().getId())
                .collect(java.util.stream.Collectors.toSet());
            var zeroSalesBooks = books.stream()
                .filter(b -> !soldBookIds.contains(b.getId()))
                .map(b -> {
                    InventorySummaryDTO.ZeroSalesBook zsb = new InventorySummaryDTO.ZeroSalesBook();
                    zsb.setTitle(b.getTitle());
                    zsb.setStockQuantity(b.getStockQuantity() != null ? b.getStockQuantity() : 0);
                    return zsb;
                })
                .toList();
            dto.setZeroSalesBooks(zeroSalesBooks);
            return dto;
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
