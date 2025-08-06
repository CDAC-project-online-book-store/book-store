package com.bookstore.bookstore_backend.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookstore.bookstore_backend.entities.UserEntity;


public interface UserDao extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity>  findByEmail(String email);
	
	boolean existsByEmail(String email);
}
