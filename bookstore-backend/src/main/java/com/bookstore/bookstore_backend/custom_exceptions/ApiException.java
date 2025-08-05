package com.bookstore.bookstore_backend.custom_exceptions;
import lombok.Getter;


@SuppressWarnings("serial")
@Getter
public class ApiException extends RuntimeException {
    private final String errorCode;

    public ApiException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}

