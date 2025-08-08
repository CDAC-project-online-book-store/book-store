package com.bookstore.bookstore_backend.custom_exceptions;

public class DuplicateReviewException extends RuntimeException {
	public DuplicateReviewException(String msg) {
		super(msg);
	}
}
