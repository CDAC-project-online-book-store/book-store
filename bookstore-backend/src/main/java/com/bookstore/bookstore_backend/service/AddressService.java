package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.AddressRequestDTO;
import com.bookstore.bookstore_backend.dto.AddressResponseDTO;

import jakarta.validation.Valid;

public interface AddressService {

	AddressResponseDTO createAddress(Long userId, @Valid AddressRequestDTO addressRequest);

}
