package com.bookstore.bookstore_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.ApiResponse;
import com.bookstore.bookstore_backend.dto.OrderItemDTO;
import com.bookstore.bookstore_backend.service.OrderItemService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/order_items")
@AllArgsConstructor
public class OrderItemController {

	private final OrderItemService orderItemService;

	@PostMapping("/{orderId}")
	@Operation(description = "Add order item to the order")
	public ResponseEntity<OrderItemDTO> addOrderItem(@PathVariable Long orderId, @RequestBody OrderItemDTO dto) {
		OrderItemDTO savedDto = orderItemService.addOrderItemToOrder(orderId, dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedDto);
	}
}
