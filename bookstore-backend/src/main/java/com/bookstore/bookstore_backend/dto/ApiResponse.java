package com.bookstore.bookstore_backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ApiResponse {
	private LocalDateTime timestamp;
	private String error;
	private String message;
	private String errorCode;
//	private String path;

	public ApiResponse(String error, String message, String errorCode) {
		this.timestamp = LocalDateTime.now();
		this.error = error;
		this.message = message;
		this.errorCode = errorCode;
//		this.path = path;
	}
	
	public ApiResponse(String message) {
		this.timestamp = LocalDateTime.now();
		this.error = "Internal Server Error";
		this.message = message;
		this.errorCode = "INTERNAL_ERROR";
	}
}
