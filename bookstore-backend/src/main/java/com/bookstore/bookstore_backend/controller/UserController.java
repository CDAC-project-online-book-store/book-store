package com.bookstore.bookstore_backend.controller;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.LoginRequestDTO;
import com.bookstore.bookstore_backend.dto.ProfileDTO;
import com.bookstore.bookstore_backend.dto.SignupRequestDTO;
import com.bookstore.bookstore_backend.dto.UserResponseDTO;
import com.bookstore.bookstore_backend.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = {"http://localhost:5173"}, allowCredentials = "true", maxAge = 48000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
	private final UserService userService;
		
	/**
	 * Register a new user account.
	 * @param signupRequest User registration details
	 * @return Created user response
	 */
	@Operation(summary = "Register a new user", description = "Creates a new user account and returns the user details.")
	@PostMapping("/signup")
	public ResponseEntity<UserResponseDTO> signup(@Valid @RequestBody SignupRequestDTO signupRequest){
		UserResponseDTO response = userService.signup(signupRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	/**
	 * Login for an existing user.
	 * @param loginRequest User login credentials
	 * @return User response if login is successful
	 */
	@Operation(summary = "User login", description = "Authenticates user and returns user details if credentials are valid.")
	@PostMapping("/login")
	public ResponseEntity<UserResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest){
		UserResponseDTO response = userService.login(loginRequest);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}
	
	/**
	 * Update user profile settings.
	 * @param profileRequest Profile update details
	 * @param userId User ID
	 * @return Success message
	 */
	@Operation(summary = "Update user profile", description = "Updates the profile settings for the specified user.")
	@PostMapping("/settings")
	public ResponseEntity<?> profileSettings(@Valid @RequestBody ProfileDTO profileRequest, Long userId){
		userService.updateUserProfile(profileRequest, userId);
		return ResponseEntity.ok("Profile updated successfully");
	}
}
