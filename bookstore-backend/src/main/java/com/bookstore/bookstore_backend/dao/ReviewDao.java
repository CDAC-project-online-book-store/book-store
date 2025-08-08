package com.bookstore.bookstore_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookstore.bookstore_backend.entities.ReviewEntity;

public interface ReviewDao extends JpaRepository<ReviewEntity, Long> {

	@Query("SELECT AVG(r.rating) FROM ReviewEntity r WHERE r.book.id = :bookId AND r.isApproved = true")
	Double findAverageRatingByBookId(@Param("bookId") Long bookId);

	boolean existsByUserIdAndBookId(Long userId, Long bookId);

}
