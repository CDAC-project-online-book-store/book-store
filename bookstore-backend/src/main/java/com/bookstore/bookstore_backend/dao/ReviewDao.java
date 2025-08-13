package com.bookstore.bookstore_backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookstore.bookstore_backend.entities.ReviewEntity;
import java.util.List;
import java.util.Optional;

public interface ReviewDao extends JpaRepository<ReviewEntity, Long> {

	@Query("SELECT AVG(r.rating) FROM ReviewEntity r WHERE r.book.id = :bookId AND r.isApproved = true")
	Double findAverageRatingByBookId(@Param("bookId") Long bookId);

	boolean existsByUserIdAndBookId(Long userId, Long bookId);

    Optional<ReviewEntity> findByUserIdAndBookId(Long userId, Long bookId);

    List<ReviewEntity> findByBookId(Long bookId);
}
