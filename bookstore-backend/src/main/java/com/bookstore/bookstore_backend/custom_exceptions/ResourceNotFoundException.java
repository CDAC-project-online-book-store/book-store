package com.bookstore.bookstore_backend.custom_exceptions;

@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException {
	public ResourceNotFoundException(String msgString) {
		super(msgString);
	}
}
