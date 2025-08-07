package com.bookstore.bookstore_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.service.OrderService;
import com.bookstore.bookstore_backend.service.OrderServiceIF;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private OrderServiceIF orderServiceIF;

	@PostMapping("/buy")
	public ResponseEntity<?> buyNow(@RequestBody OrderRequest request) {
		return ResponseEntity.ok(orderService.buyNow(request.getBookId(), request.getQuantity()));
	}

}

class OrderRequest {
	private Long bookId;
	private int quantity;
	private Long addressId;

	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Long getAddressId() {
		return addressId;
	}

	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}
}
