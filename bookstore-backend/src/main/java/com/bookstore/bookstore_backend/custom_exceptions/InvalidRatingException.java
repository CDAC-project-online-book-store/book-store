package com.bookstore.bookstore_backend.custom_exceptions;

@SuppressWarnings("serial")
public class InvalidRatingException extends RuntimeException {
	public InvalidRatingException(String msg) {
		super(msg);
	}
}
