package com.bookstore.bookstore_backend.global_exception_handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.bookstore.bookstore_backend.custom_exceptions.*;
import com.bookstore.bookstore_backend.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> handleApiException(ApiException e) {
		System.out.println("in handleApiException");
		return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(new ApiResponse("Conflict", e.getMessage(), e.getErrorCode()));
	}

	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<?> handleAuthenticationException(AuthenticationException e) {
		System.out.println("in handleAuthenticationException");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new ApiResponse("UNAUTHORIZED", e.getMessage(), "AUTH_FAILED"));
	}

	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<?> handleInvalidCredentialsException(InvalidCredentialsException e) {
		System.out.println("in handleInvalidCredentialsException");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new ApiResponse("UNAUTHORIZED", e.getMessage(), "INVALID_USER_CREDENTIALS"));
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException e) {
		System.out.println("in handleUserNotFoundException");
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ApiResponse("NOT_FOUND", e.getMessage(), "USER_NOT_FOUND"));
	}

	// equivalent to catch-all
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e) {
		System.out.println("in catch all exc");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
	}

}
