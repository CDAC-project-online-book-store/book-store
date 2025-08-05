package com.bookstore.bookstore_backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.bookstore_backend.entities.AuthorEntity;

public interface AuthorDao extends JpaRepository<AuthorEntity, Long> {

	List<AuthorEntity> findByAuthorContainingIgnoreCase(String name);
}
