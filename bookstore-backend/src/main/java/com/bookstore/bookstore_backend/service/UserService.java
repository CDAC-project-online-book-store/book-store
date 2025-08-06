package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.SignupRequestDTO;
import com.bookstore.bookstore_backend.dto.UserResponseDTO;

public interface UserService {
	UserResponseDTO signup(SignupRequestDTO signupRequest);
}
