package com.bookstore.bookstore_backend.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bookstore.bookstore_backend.entities.UserEntity;


public interface UserDao extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByEmail(String email);
	Optional<UserEntity> findByUserName(String userName);
	Optional<UserEntity> findByEmailOrUserName(String email, String userName);
	boolean existsByEmail(String email);
}
