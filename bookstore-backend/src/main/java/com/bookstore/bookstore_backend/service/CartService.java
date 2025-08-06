package com.bookstore.bookstore_backend.service;

import org.springframework.stereotype.Service;

@Service
public class CartService {
    public String addToCart(Long bookId, int quantity) {
        // TODO: Implement cart logic (add book to user's cart)
        return "Book added to cart: " + bookId + " (qty: " + quantity + ")";
    }
}
