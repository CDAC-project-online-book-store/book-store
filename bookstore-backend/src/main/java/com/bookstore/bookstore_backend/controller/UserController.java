package com.bookstore.bookstore_backend.controller;

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
		
	@PostMapping("/signup")
	public ResponseEntity<UserResponseDTO> signup(@Valid @RequestBody SignupRequestDTO signupRequest){
		UserResponseDTO response = userService.signup(signupRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest){
		UserResponseDTO response = userService.login(loginRequest);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}
	
	@PostMapping("/settings")
	public ResponseEntity<?> profileSettings(@Valid @RequestBody ProfileDTO profileRequest, Long userId){
		userService.updateUserProfile(profileRequest, userId);
		return ResponseEntity.ok("Profile updated successfully");
		
	}
}
