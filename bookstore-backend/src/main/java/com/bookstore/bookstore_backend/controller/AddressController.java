package com.bookstore.bookstore_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.bookstore.bookstore_backend.dto.AddressRequestDTO;
import com.bookstore.bookstore_backend.dto.AddressResponseDTO;
import com.bookstore.bookstore_backend.service.AddressService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true", maxAge = 48000)
@RequiredArgsConstructor
@RequestMapping("/addresses")
public class AddressController {
	private final AddressService addressService;

	/**
	 * Create a new address for a user.
	 * @param userId ID of the user
	 * @param addressRequest Address details
	 * @return Created address
	 */
	@Operation(summary = "Create a new address for a user", description = "Creates and returns the newly added address for the specified user.")
	@PostMapping("/create")
	public ResponseEntity<AddressResponseDTO> createAddress(@RequestParam Long userId,
			@Valid @RequestBody AddressRequestDTO addressRequest) {
		AddressResponseDTO response = addressService.createAddress(userId, addressRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	/**
	 * Get all addresses for a user.
	 * @param userId ID of the user
	 * @return List of addresses
	 */
	@Operation(summary = "Get all addresses for a user", description = "Returns all addresses associated with the specified user.")
	@GetMapping("/get")
	public  ResponseEntity<List<AddressResponseDTO>> getAllAddresses(@RequestParam Long userId) {
		List<AddressResponseDTO> addresslist = addressService.getAddresses(userId);
		return ResponseEntity.ok(addresslist);
	}
	
	/**
	 * Edit an existing address for a user.
	 * @param userId ID of the user
	 * @param addressId ID of the address
	 * @param addressRequestDTO Updated address details
	 * @return Updated address
	 */
	@Operation(summary = "Edit an address for a user", description = "Updates and returns the address for the specified user and address ID.")
	@PutMapping("/edit")
	public ResponseEntity<AddressResponseDTO> editAddress(@RequestParam Long userId, @RequestParam Long addressId, @Valid @RequestBody AddressRequestDTO addressRequestDTO){
		AddressResponseDTO response = addressService.editMyAddress(userId, addressId, addressRequestDTO);
//		return ResponseEntity.status(HttpStatus.OK)
		return ResponseEntity.ok(response);
	}
	
	/**
	 * Delete an address for a user (soft delete).
	 * @param userId ID of the user
	 * @param addressId ID of the address
	 * @return No content
	 */
	@Operation(summary = "Delete an address for a user", description = "Soft deletes the address for the specified user and address ID.")
	@DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@RequestParam Long userId, @PathVariable("addressId") Long addressId){
        System.out.println("Delete request received - User ID: " + userId + ", Address ID: " + addressId);
        try {
            addressService.softDeleteAddress(userId, addressId);
            System.out.println("Address deleted successfully - User ID: " + userId + ", Address ID: " + addressId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.err.println("Error deleting address - User ID: " + userId + ", Address ID: " + addressId + ", Error: " + e.getMessage());
            throw e;
        }
    }
	
}
