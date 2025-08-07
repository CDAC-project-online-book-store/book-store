package com.bookstore.bookstore_backend.service;

import org.springframework.stereotype.Service;

@Service
public class OrderService {
	public String buyNow(Long bookId, int quantity) {
		// TODO: Implement order logic (create order for book)
		return "Order placed for book: " + bookId + " (qty: " + quantity + ")";
	}

}
