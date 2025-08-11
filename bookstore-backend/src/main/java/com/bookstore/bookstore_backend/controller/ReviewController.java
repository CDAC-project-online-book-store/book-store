package com.bookstore.bookstore_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.ReviewDTO;
import com.bookstore.bookstore_backend.dto.ReviewRequestDTO;
import com.bookstore.bookstore_backend.dto.ReviewSummaryDTO;
import com.bookstore.bookstore_backend.service.ReviewService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@AllArgsConstructor
public class ReviewController {

	private final ReviewService reviewService;

	@GetMapping("/average-rating/{bookId}")
	public @ResponseBody Double getAverageRating(@PathVariable Long bookId) {
		return reviewService.getAverageRatingForBook(bookId);
	}

	@PostMapping
	public ResponseEntity<ReviewDTO> addReview(@RequestBody ReviewRequestDTO request) {
		ReviewDTO createdReview = reviewService.addReview(request);
		return ResponseEntity.ok(createdReview);
	}

    @PutMapping
    public ResponseEntity<ReviewDTO> updateReview(@RequestBody ReviewRequestDTO request) {
        ReviewDTO updated = reviewService.updateReview(request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<java.util.List<ReviewSummaryDTO>> getReviewsForBook(@PathVariable Long bookId) {
        return ResponseEntity.ok(reviewService.getReviewsForBook(bookId));
    }

    @GetMapping("/by-user-and-book")
    public ResponseEntity<ReviewDTO> getReviewByUserAndBook(@org.springframework.web.bind.annotation.RequestParam Long userId,
                                                            @org.springframework.web.bind.annotation.RequestParam Long bookId) {
        ReviewDTO dto = reviewService.getReviewByUserAndBook(userId, bookId);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }
}
