package com.bookstore.bookstore_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
}
