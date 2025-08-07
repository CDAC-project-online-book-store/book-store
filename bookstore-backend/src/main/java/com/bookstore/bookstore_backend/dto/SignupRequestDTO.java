package com.bookstore.bookstore_backend.dto;

import com.bookstore.bookstore_backend.entities.UserRole;

import jakarta.validation.constraints.Email;
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
public class SignupRequestDTO {
	@NotBlank(message = "User name is required")
    @Size(max = 100, message = "User name cannot exceed 100 characters")
    private String userName;
	
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid Email ID")
	@Size(max = 256, message = "Email cannot exceed 256 characters")
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 6, max = 256, message = "Password must be 6-256 characters")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$", message = "Password must contain letters and digits")
	private String password;
	
	@NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phoneNumber;
	
	private UserRole role; // Optional, can be null
}
