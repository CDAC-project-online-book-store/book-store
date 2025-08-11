package com.bookstore.bookstore_backend.controller;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.OrderDTO;
import com.bookstore.bookstore_backend.dto.OrderRequestDTO;
import com.bookstore.bookstore_backend.service.OrderService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600) // Allow all origins, adjust as needed
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

	/**
	 * Get all orders in the system.
	 * @return List of all orders
	 */
	@Operation(summary = "Get all orders", description = "Returns a list of all orders in the system.")
	@GetMapping
	public ResponseEntity<List<OrderDTO>> getAllOrders() {
		return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
	}

	/**
	 * Get all orders for a specific user.
	 * @param userId ID of the user
	 * @return List of orders for the user
	 */
	@Operation(summary = "Get orders by user", description = "Returns all orders placed by the specified user.")
	@GetMapping("/by-user")
	public ResponseEntity<List<OrderDTO>> getOrdersByUser(@RequestParam Long userId) {
		return ResponseEntity.ok(orderService.getOrdersByUser(userId));
	}

	/**
	 * Get details of a specific order by ID.
	 * @param id Order ID
	 * @return Order details
	 */
	@Operation(summary = "Get order by ID", description = "Returns details of the order with the specified ID.")
	@GetMapping("/{id}")
	public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
		OrderDTO order = orderService.getOrderById(id);
		return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
	}

	/**
	 * Create a new order.
	 * @param orderDTO Order details
	 * @return Created order
	 */
	@Operation(summary = "Create a new order", description = "Creates a new order and returns the created order details.")
	@PostMapping
	public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
		return new ResponseEntity<>(orderService.createOrder(orderDTO), HttpStatus.CREATED);
	}

	/**
	 * Delete an order by ID.
	 * @param id Order ID
	 * @return No content
	 */
	@Operation(summary = "Delete order by ID", description = "Deletes the order with the specified ID.")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
		orderService.deleteOrder(id);
		return ResponseEntity.noContent().build();
	}

	/**
	 * Get the status of a specific order.
	 * @param id Order ID
	 * @return Order status
	 */
	@Operation(summary = "Get order status", description = "Returns the status of the order with the specified ID.")
	@GetMapping("/status/{id}")
	public ResponseEntity<?> getOrderStatus(@PathVariable Long id) {
		String status = orderService.getOrderStatus(id);
		return ResponseEntity.ok(status);
	}

	/**
	 * Get all orders with a specific status.
	 * @param status Order status
	 * @return List of orders with the given status
	 */
	@Operation(summary = "Get orders by status", description = "Returns all orders with the specified status.")
	@GetMapping("/st/{status}")
	public ResponseEntity<List<OrderDTO>> getOrdersbyStatus(@PathVariable String status) {
		return new ResponseEntity<>(orderService.getAllOrderswithStatus(status), HttpStatus.OK);
	}

}
