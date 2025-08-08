package com.bookstore.bookstore_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.bookstore_backend.entities.PaymentDetailsEntity;

public interface PaymentDao extends JpaRepository<PaymentDetailsEntity, Long> {

}
