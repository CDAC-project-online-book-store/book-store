package com.bookstore.bookstore_backend.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.bookstore_backend.entities.AddressEntity;
import com.bookstore.bookstore_backend.entities.UserEntity;

public interface AddressDao extends JpaRepository<AddressEntity, Long> {
	List<AddressEntity> findByUserAndIsActiveTrue(UserEntity user);
	
	// Add a method to find all addresses for debugging
	List<AddressEntity> findByUser(UserEntity user);
}
