package com.bookstore.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
// annotation to call super class
@ToString(callSuper = true)
public class UserResponseDTO extends BaseDTO {
	
	private String email;
	private String userName;
	private String phoneNumber;
	private String role;
	private Boolean isActive;
}
