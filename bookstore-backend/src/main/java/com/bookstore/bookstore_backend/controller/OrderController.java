package com.bookstore.bookstore_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

//	@PostMapping
//	public ResponseEntity<OrderDTO> placeOrder(@RequestBody OrderRequestDTO request) {
//		OrderDTO response = orderService.createOrder(request);
//		return ResponseEntity.ok(response);
//	}

	@GetMapping
	public ResponseEntity<List<OrderDTO>> getAllOrders() {
		return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
		OrderDTO order = orderService.getOrderById(id);
		return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
		return new ResponseEntity<>(orderService.createOrder(orderDTO), HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
		orderService.deleteOrder(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/status/{id}")
	public ResponseEntity<?> getOrderStatus(@PathVariable Long id) {
		String status = orderService.getOrderStatus(id);
		return ResponseEntity.ok(status);

	}

	@GetMapping("/st/{status}")
	public ResponseEntity<List<OrderDTO>> getOrdersbyStatus(@PathVariable String status) {
		return new ResponseEntity<>(orderService.getAllOrderswithStatus(status), HttpStatus.OK);

	}

}
