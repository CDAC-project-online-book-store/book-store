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
import com.bookstore.bookstore_backend.dto.JwtResponseDTO;
import com.bookstore.bookstore_backend.security.JwtUtil;
import com.bookstore.bookstore_backend.security.UserDetailsServiceImpl;
import com.bookstore.bookstore_backend.service.UserService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = {"http://localhost:5173"}, allowCredentials = "true", maxAge = 48000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final UserDetailsServiceImpl userDetailsService;
		
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
	public ResponseEntity<JwtResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest){
		Authentication authentication = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
		);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		String role = userDetails.getAuthorities().iterator().next().getAuthority();
		// Remove 'ROLE_' prefix if present
		if (role.startsWith("ROLE_")) {
			role = role.substring(5);
		}
		String token = jwtUtil.generateToken(userDetails.getUsername(), role);

		// Fetch userName from UserEntity using email
		String userName = "";
		Long userId = null;
		var userOpt = userService.findByEmail(userDetails.getUsername());
		if (userOpt.isPresent()) {
			userName = userOpt.get().getUserName();
			userId = userOpt.get().getId();
		}
		JwtResponseDTO response = new JwtResponseDTO(token, userName, role, userId);
		return ResponseEntity.ok(response);
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
