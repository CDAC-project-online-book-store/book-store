package com.bookstore.bookstore_backend.custom_exceptions;

@SuppressWarnings("serial")
public class InvalidCredentialsException extends RuntimeException {
	public InvalidCredentialsException(String msgString) {
		super(msgString);
	}
}
