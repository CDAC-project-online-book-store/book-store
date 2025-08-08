package com.bookstore.bookstore_backend.custom_exceptions;

public class InvalidRatingException extends RuntimeException {
	public InvalidRatingException(String msg) {
		super(msg);
	}
}
