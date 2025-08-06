package com.bookstore.bookstore_backend.service;

import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.dao.ReviewDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewDao reviewDao;

	@Override
	public Double getAverageRatingForBook(Long bookId) {
		return reviewDao.findAverageRatingByBookId(bookId);
	}
}
