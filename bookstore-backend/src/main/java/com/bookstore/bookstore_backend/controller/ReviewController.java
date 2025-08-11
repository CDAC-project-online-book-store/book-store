package com.bookstore.bookstore_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.ReviewDTO;
import com.bookstore.bookstore_backend.dto.ReviewRequestDTO;
import com.bookstore.bookstore_backend.service.ReviewService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@AllArgsConstructor
public class ReviewController {

	private final ReviewService reviewService;

	/**
	 * Get the average rating for a book.
	 * @param bookId ID of the book
	 * @return Average rating value
	 */
	@Operation(summary = "Get average rating for a book", description = "Returns the average rating for the specified book ID.")
	@GetMapping("/average-rating/{bookId}")
	public @ResponseBody Double getAverageRating(@PathVariable Long bookId) {
		return reviewService.getAverageRatingForBook(bookId);
	}

	/**
	 * Add a new review for a book.
	 * @param request Review details
	 * @return Created review
	 */
	@Operation(summary = "Add a new review", description = "Creates and returns a new review for a book.")
	@PostMapping
	public ResponseEntity<ReviewDTO> addReview(@RequestBody ReviewRequestDTO request) {
		ReviewDTO createdReview = reviewService.addReview(request);
		return ResponseEntity.ok(createdReview);
	}

}
