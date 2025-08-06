package com.bookstore.bookstore_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookstore.bookstore_backend.entities.CategoryEntity;

public interface CategoryDao extends JpaRepository<CategoryEntity, Long> {

}
