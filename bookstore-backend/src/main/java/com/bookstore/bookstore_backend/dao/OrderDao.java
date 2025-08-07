package com.bookstore.bookstore_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.bookstore_backend.entities.OrderEntity;

public interface OrderDao extends JpaRepository<OrderEntity, Long> {

}
