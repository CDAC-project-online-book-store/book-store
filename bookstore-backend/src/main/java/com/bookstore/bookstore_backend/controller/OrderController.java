package com.bookstore.bookstore_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookstore.bookstore_backend.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/buy")
    public ResponseEntity<?> buyNow(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.buyNow(request.getBookId(), request.getQuantity()));
    }
}

class OrderRequest {
    private Long bookId;
    private int quantity;
    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
