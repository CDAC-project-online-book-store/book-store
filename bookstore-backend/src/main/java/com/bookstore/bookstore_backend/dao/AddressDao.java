package com.bookstore.bookstore_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.bookstore_backend.entities.AddressEntity;

public interface AddressDao extends JpaRepository<AddressEntity, Long> {

}
