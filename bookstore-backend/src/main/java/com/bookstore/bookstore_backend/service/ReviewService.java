package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.ReviewDTO;
import com.bookstore.bookstore_backend.dto.ReviewRequestDTO;

public interface ReviewService {

	Double getAverageRatingForBook(Long bookId);

	ReviewDTO addReview(ReviewRequestDTO request);
}
