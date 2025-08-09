package com.bookstore.bookstore_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.OrderDTO;
import com.bookstore.bookstore_backend.dto.OrderRequestDTO;
import com.bookstore.bookstore_backend.service.OrderService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/order")
@AllArgsConstructor
public class OrderController {

	private final OrderService orderService;

	@PostMapping
	public ResponseEntity<OrderDTO> placeOrder(@RequestBody @Valid OrderRequestDTO request) {
		OrderDTO response = orderService.createOrder(request);
		return ResponseEntity.ok(response);
	}

	@GetMapping
	public ResponseEntity<List<OrderDTO>> getAllOrders() {
		return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
	}

}
