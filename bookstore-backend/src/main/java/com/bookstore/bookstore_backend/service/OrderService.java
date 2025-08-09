package com.bookstore.bookstore_backend.service;

import java.util.List;

import com.bookstore.bookstore_backend.dto.OrderDTO;
import com.bookstore.bookstore_backend.dto.OrderRequestDTO;

import jakarta.validation.Valid;

public interface OrderService {

	List<OrderDTO> getAllOrders();

	OrderDTO getOrderById(Long id);

	OrderDTO createOrder(OrderRequestDTO request);

	String getOrderStatus(Long id);

	void deleteOrder(Long id);

	List<OrderDTO> getAllOrderswithStatus(String status);
}
