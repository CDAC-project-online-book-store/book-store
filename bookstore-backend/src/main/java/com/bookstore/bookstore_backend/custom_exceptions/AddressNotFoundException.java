package com.bookstore.bookstore_backend.custom_exceptions;

@SuppressWarnings("serial")
public class AddressNotFoundException extends RuntimeException {
	public AddressNotFoundException(String msgString) {
		super(msgString);
	}
}
