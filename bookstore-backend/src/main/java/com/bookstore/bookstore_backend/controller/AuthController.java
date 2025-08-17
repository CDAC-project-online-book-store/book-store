package com.bookstore.bookstore_backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.LoginRequestDTO;
import com.bookstore.bookstore_backend.dto.SignupRequestDTO;
import com.bookstore.bookstore_backend.dto.UserResponseDTO;
import com.bookstore.bookstore_backend.security.JwtUtils;
import com.bookstore.bookstore_backend.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
	private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO req) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
            );

            // Generate JWT from Authentication
            String token = jwtUtils.generateTokenFromAuthentication(authentication);

            // Delegate to service for user info (ensures all fields are set)
            UserResponseDTO userDto = userService.login(req);

            // Return token + user info
            return ResponseEntity.ok(Map.of(
                "token", token,
                "type", "Bearer",
                "user", userDto
            ));
        } catch (org.springframework.security.core.AuthenticationException ex) {
            log.warn("Login failed for {} : {}", req.getEmail(), ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDTO signupRequest) {
        // delegate to service which already encodes password & saves
        UserResponseDTO saved = userService.signup(signupRequest);

        // create token and return it along with created user (convenient for frontend)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signupRequest.getEmail(), signupRequest.getPassword())
        );
        String token = jwtUtils.generateTokenFromAuthentication(authentication);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
            "token", token,
            "type", "Bearer",
            "user", saved
        ));
    }
    
}
