package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.ReviewDTO;
import com.bookstore.bookstore_backend.dto.ReviewRequestDTO;
import com.bookstore.bookstore_backend.dto.ReviewSummaryDTO;

public interface ReviewService {

	Double getAverageRatingForBook(Long bookId);

	ReviewDTO addReview(ReviewRequestDTO request);

    ReviewDTO updateReview(ReviewRequestDTO request);

    java.util.List<ReviewSummaryDTO> getReviewsForBook(Long bookId);

    ReviewDTO getReviewByUserAndBook(Long userId, Long bookId);
}
