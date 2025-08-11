package com.bookstore.bookstore_backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.custom_exceptions.DuplicateReviewException;
import com.bookstore.bookstore_backend.custom_exceptions.InvalidRatingException;
import com.bookstore.bookstore_backend.custom_exceptions.ResourceNotFoundException;
import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dao.ReviewDao;
import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.dto.ReviewDTO;
import com.bookstore.bookstore_backend.dto.ReviewRequestDTO;
import com.bookstore.bookstore_backend.dto.ReviewSummaryDTO;
import com.bookstore.bookstore_backend.entities.BookEntity;
import com.bookstore.bookstore_backend.entities.ReviewEntity;
import com.bookstore.bookstore_backend.entities.UserEntity;

import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

	private final ReviewDao reviewDao;
	private final UserDao userDao;
	private final BookDao bookDao;
	private final ModelMapper modelMapper;

	@Override
	public Double getAverageRatingForBook(Long bookId) {
		return reviewDao.findAverageRatingByBookId(bookId);
	}

	@Override
	public ReviewDTO addReview(ReviewRequestDTO request) {
		// 1. Validate rating range (1–5)
		if (request.getRating() < 1 || request.getRating() > 5) {
			throw new InvalidRatingException("Rating must be between 1 and 5");
		}

		// 2. Validate existence of user and book
		UserEntity user = userDao.findById(request.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

		BookEntity book = bookDao.findById(request.getBookId())
				.orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + request.getBookId()));

		// 3. Prevent duplicate reviews
		boolean alreadyReviewed = reviewDao.existsByUserIdAndBookId(user.getId(), book.getId());
		if (alreadyReviewed) {
			throw new DuplicateReviewException("User has already reviewed this book");
		}

		// 4. Create and save review
		ReviewEntity review = new ReviewEntity();
		review.setUser(user);
		review.setBook(book);
		review.setRating(request.getRating());
		review.setComments(request.getComments());
		review.setApproved(true); // Or set to false if admin approval needed

		ReviewEntity saved = reviewDao.save(review);
		return modelMapper.map(saved, ReviewDTO.class);
	}

    @Override
    public ReviewDTO updateReview(ReviewRequestDTO request) {
        // 1. Validate rating range (1–5)
        if (request.getRating() < 1 || request.getRating() > 5) {
            throw new InvalidRatingException("Rating must be between 1 and 5");
        }

        // 2. Validate existence of user and book
        UserEntity user = userDao.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        BookEntity book = bookDao.findById(request.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ID: " + request.getBookId()));

        // 3. Find existing review
        ReviewEntity existing = reviewDao.findByUserIdAndBookId(user.getId(), book.getId())
                .orElseThrow(() -> new ResourceNotFoundException("No existing review to update"));

        existing.setRating(request.getRating());
        existing.setComments(request.getComments());
        ReviewEntity saved = reviewDao.save(existing);
        return modelMapper.map(saved, ReviewDTO.class);
    }

    @Override
    public java.util.List<ReviewSummaryDTO> getReviewsForBook(Long bookId) {
        return reviewDao.findByBookId(bookId).stream().map(r -> {
            ReviewSummaryDTO dto = new ReviewSummaryDTO();
            dto.setId(r.getId());
            dto.setUserId(r.getUser().getId());
            dto.setUserName(r.getUser().getUserName());
            dto.setBookId(r.getBook().getId());
            dto.setRating(r.getRating());
            dto.setComments(r.getComments());
            return dto;
        }).toList();
    }

    @Override
    public ReviewDTO getReviewByUserAndBook(Long userId, Long bookId) {
        return reviewDao.findByUserIdAndBookId(userId, bookId)
                .map(r -> modelMapper.map(r, ReviewDTO.class))
                .orElse(null);
    }
}
