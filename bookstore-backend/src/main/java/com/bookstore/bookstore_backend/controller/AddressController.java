package com.bookstore.bookstore_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.AddressRequestDTO;
import com.bookstore.bookstore_backend.dto.AddressResponseDTO;
import com.bookstore.bookstore_backend.service.AddressService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/addresses")
public class AddressController {
	private final AddressService addressService;
	
	@PostMapping("/create")
	public ResponseEntity<AddressResponseDTO> createAddress(@RequestParam Long userId, @Valid @RequestBody AddressRequestDTO addressRequest){
		AddressResponseDTO response = addressService.createAddress(userId, addressRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
}
