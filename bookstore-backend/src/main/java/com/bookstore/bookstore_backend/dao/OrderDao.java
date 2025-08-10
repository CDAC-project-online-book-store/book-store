package com.bookstore.bookstore_backend.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.bookstore_backend.entities.OrderEntity;
import com.bookstore.bookstore_backend.entities.OrderStatus;

@Repository
public interface OrderDao extends JpaRepository<OrderEntity, Long> {
	List<OrderEntity> findByOrderStatus(String status);
	// Method to find orders by status with pagination

	Page<OrderEntity> findByOrderStatus(OrderStatus status, Pageable pageable);

	List<OrderEntity> findByUserId(Long userId);
}