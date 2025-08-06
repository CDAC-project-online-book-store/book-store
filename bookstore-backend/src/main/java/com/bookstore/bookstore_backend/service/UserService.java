package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.LoginRequestDTO;
import com.bookstore.bookstore_backend.dto.ProfileDTO;
import com.bookstore.bookstore_backend.dto.SignupRequestDTO;
import com.bookstore.bookstore_backend.dto.UserResponseDTO;

import jakarta.validation.Valid;

public interface UserService {
	UserResponseDTO signup(@Valid SignupRequestDTO signupRequest);

	UserResponseDTO login(@Valid LoginRequestDTO loginRequest);

	void updateUserProfile(@Valid ProfileDTO profileRequest, Long userId);
	
}
