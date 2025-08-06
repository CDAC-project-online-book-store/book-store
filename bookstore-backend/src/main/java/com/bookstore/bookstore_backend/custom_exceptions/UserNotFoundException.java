package com.bookstore.bookstore_backend.custom_exceptions;

@SuppressWarnings("serial")
public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(String msgString) {
		super(msgString);
	}
}
