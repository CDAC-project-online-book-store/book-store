package com.bookstore.bookstore_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
	private Long id;
	private String email;
	private String userName;
	private String phoneNumber;
	private String role;
}
