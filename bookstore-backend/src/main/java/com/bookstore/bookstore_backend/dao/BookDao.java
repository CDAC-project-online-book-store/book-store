package com.bookstore.bookstore_backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.bookstore_backend.entities.BookEntity;

@Repository
public interface BookDao extends JpaRepository<BookEntity, Long> {
	List<BookEntity> findByIsActiveTrue();
}
