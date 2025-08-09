package com.bookstore.bookstore_backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.bookstore_backend.entities.OrderEntity;

@Repository
public interface OrderDao extends JpaRepository<OrderEntity, Long> {
	List<OrderEntity> findByOrderStatus(String status);
}
