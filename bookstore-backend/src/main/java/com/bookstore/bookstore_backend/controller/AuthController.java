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

import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.dto.LoginRequestDTO;
import com.bookstore.bookstore_backend.dto.SignupRequestDTO;
import com.bookstore.bookstore_backend.dto.UserResponseDTO;
import com.bookstore.bookstore_backend.entities.UserEntity;
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
    private final UserDao userDao;
    private final UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO req) {
        try {
            // 1) Authenticate (this will use DaoAuthenticationProvider + your UserDetailsService)
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
            );

            // 2) Generate JWT from Authentication
            String token = jwtUtils.generateTokenFromAuthentication(authentication);

            // 3) Load user entity to return user info (no password)
            UserEntity user = userDao.findByEmail(req.getEmail()).orElseThrow();
            // Map to DTO (you used ModelMapper in service; if you want do it here)
            UserResponseDTO userDto = new UserResponseDTO();
            userDto.setEmail(user.getEmail());
            userDto.setUserName(user.getUserName());
            userDto.setPhoneNumber(user.getPhoneNumber());
            userDto.setRole(user.getRole().name());
            userDto.setIsActive(user.getIsActive());

            // 4) Return token + user info
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

        // Optional: auto-login and return token immediately after signup
        // Option A: just return created DTO
        // return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        // Option B: create token and return it along with created user (convenient for frontend)
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
