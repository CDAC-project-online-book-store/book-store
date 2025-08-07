package com.bookstore.bookstore_backend.service;

import java.util.List;

import com.bookstore.bookstore_backend.dto.LoginRequestDTO;
import com.bookstore.bookstore_backend.dto.ProfileDTO;
import com.bookstore.bookstore_backend.dto.SignupRequestDTO;
import com.bookstore.bookstore_backend.dto.UserResponseDTO;

import jakarta.validation.Valid;

public interface UserService {
	/**
	 * Method to register a new user
	 * 
	 * @param signupRequest - contains user details for registration
	 * @return UserResponseDTO - the registered user's details
	 */
	UserResponseDTO signup(@Valid SignupRequestDTO signupRequest);

	/**
	 * Method to login a user
	 * 
	 * @param loginRequest - contains email and password for login
	 * @return UserResponseDTO - the logged-in user's details
	 */
	UserResponseDTO login(@Valid LoginRequestDTO loginRequest);
	
	/**
	 * Method to update user profile
	 * 
	 * @param profileRequest - contains updated user details
	 * @param userId         - the ID of the user to be updated
	 */
	void updateUserProfile(@Valid ProfileDTO profileRequest, Long userId);

	/**
	 * Method to get the details of all users
	 * 
	 * @return List<UserResponseDTO> - list of all users
	 */
	List<UserResponseDTO> getAllUsers();

	/**
	 * Method to update user details by admin
	 * @param userId - id of user to update
	 * @param updateRequest - new user details
	 * @return UserResponseDTO - updated user details
	 */
	UserResponseDTO updateUserByAdmin(Long userId, SignupRequestDTO updateRequest);
	
	/**
	 * Deactivate user by setting isActive=false
	 * @param userId - id of user to deactivate
	 * @return UserResponseDTO - updated user details
	 */
	UserResponseDTO deactivateUser(Long userId);
}
