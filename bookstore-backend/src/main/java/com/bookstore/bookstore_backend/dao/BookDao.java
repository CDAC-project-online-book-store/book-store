package com.bookstore.bookstore_backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.bookstore_backend.entities.BookEntity;
import com.bookstore.bookstore_backend.entities.Format;

@Repository
public interface BookDao extends JpaRepository<BookEntity, Long> {
	List<BookEntity> findByIsActiveTrue();

	List<BookEntity> findAll();

	Optional<BookEntity> findByIsbn(String isbn);

	List<BookEntity> findByTitleContainingIgnoreCaseAndIsActiveTrue(String keyword);

	List<BookEntity> findAllByOrderByPriceAsc();

	List<BookEntity> findAllByOrderByPriceDesc();

	List<BookEntity> findByPriceBetween(double minPrice, double maxPrice);

	List<BookEntity> findByFormat(Format format);

	List<BookEntity> findByLanguageIgnoreCase(String language);

	List<BookEntity> findByRatingGreaterThanEqual(Double rating);

}
