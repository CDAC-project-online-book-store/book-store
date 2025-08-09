package com.bookstore.bookstore_backend.service;

import java.util.List;

import com.bookstore.bookstore_backend.dto.AddressRequestDTO;
import com.bookstore.bookstore_backend.dto.AddressResponseDTO;

import jakarta.validation.Valid;

public interface AddressService {

	AddressResponseDTO createAddress(Long userId, @Valid AddressRequestDTO addressRequest);

	List<AddressResponseDTO> getAddresses(Long userId);

	AddressResponseDTO editMyAddress(Long userId, Long addressId, @Valid AddressRequestDTO addressRequestDTO);

}
