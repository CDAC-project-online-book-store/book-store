package com.bookstore.bookstore_backend.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bookstore.bookstore_backend.entities.CategoryEntity;

@Repository
public interface CategoryDao extends JpaRepository<CategoryEntity, Long> {

}
