package com.bookstore.bookstore_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.bookstore_backend.entities.OrderItemEntity;

public interface OrderItemDao extends JpaRepository<OrderItemEntity, Long> {

}
