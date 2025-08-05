package com.bookstore.bookstore_backend.custom_exceptions;

@SuppressWarnings("serial")
public class AuthenticationException extends RuntimeException {
	public AuthenticationException(String msgString) {
		super(msgString);
	}
}
