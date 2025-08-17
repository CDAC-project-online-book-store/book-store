package com.bookstore.bookstore_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.SignupRequestDTO; 
import com.bookstore.bookstore_backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = {"http://localhost:5173"}, allowCredentials = "true", maxAge = 48000)
@RestController
@RequestMapping("/admin/users") 
//Uncomment this line to restrict access to ADMIN role
//@PreAuthorize("hasRole('ADMIN')") 
@AllArgsConstructor
public class AdminUserController {

   private final UserService userService;

   // method to get all users
   @GetMapping
   @Operation(summary = "Get all users (admin)")
   public ResponseEntity<?> getAllUsers() {
	   return ResponseEntity.ok(userService.getAllUsers());
   }

   // method to create a new user from admin panel(including user with Admin role)
   @PostMapping
   @Operation(summary = "Create a new user (admin)")
   public ResponseEntity<?> createUser(@Valid @RequestBody SignupRequestDTO signupRequest) {
	   return ResponseEntity.ok(userService.signup(signupRequest));
   }

   // method to update user details by admin
   @PutMapping("/{id}")
   @Operation(summary = "Update user details (admin)")
   public ResponseEntity<?> updateUserByAdmin(@PathVariable Long id, @Valid @RequestBody SignupRequestDTO updateRequest) {
	   return ResponseEntity.ok(userService.updateUserByAdmin(id, updateRequest));
   }

   // method to deactivate user (set isActive=false)
   @PutMapping("/{id}/deactivate")
   @Operation(summary = "Deactivate user (admin)")
   public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
	   return ResponseEntity.ok(userService.deactivateUser(id));
   }

}
