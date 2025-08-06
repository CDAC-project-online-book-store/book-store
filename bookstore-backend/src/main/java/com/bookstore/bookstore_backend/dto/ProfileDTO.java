package com.bookstore.bookstore_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
public class ProfileDTO {
	@NotBlank
	@Size(min = 2, max = 100, message = "Name must be between 2 and 50 characters")
	private String userName;	
	
	@NotBlank
	@Size(min = 6, max = 256, message = "Password must be between 6 and 256 characters")
	private String password;
	
	@NotBlank
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone number must be a valid 10-digit Indian number")
	private String phoneNumber;
}
