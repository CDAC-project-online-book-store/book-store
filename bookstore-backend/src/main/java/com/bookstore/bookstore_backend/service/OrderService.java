package com.bookstore.bookstore_backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bookstore.bookstore_backend.dto.AdminOrderRespDTO;
import com.bookstore.bookstore_backend.dto.OrderDTO;
import com.bookstore.bookstore_backend.dto.OrderRequestDTO;
import com.bookstore.bookstore_backend.entities.OrderStatus;

import jakarta.validation.Valid;

public interface OrderService {

	List<OrderDTO> getAllOrders();

	OrderDTO getOrderById(Long id);

	OrderDTO createOrder(OrderDTO orderDTO);

	String getOrderStatus(Long id);

	void deleteOrder(Long id);

	List<OrderDTO> getAllOrderswithStatus(String status);

	OrderDTO createOrder(OrderRequestDTO orderRequestDTO);

	Page<AdminOrderRespDTO> getAllOrdersForAdmin(Pageable pageable);

	AdminOrderRespDTO getOrderDetailsForAdmin(Long orderId);

	AdminOrderRespDTO updateOrderStatus(Long orderId, String status);

	void softDeleteOrder(Long orderId);

	List<AdminOrderRespDTO> searchOrdersForAdmin(String query);

	Page<AdminOrderRespDTO> getOrdersByStatus(OrderStatus status, Pageable pageable);
    List<OrderDTO> getOrdersByUser(Long userId);
}
