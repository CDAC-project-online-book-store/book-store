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

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true", maxAge = 48000)
@RequiredArgsConstructor
@RequestMapping("/addresses")
public class AddressController {
	private final AddressService addressService;

	//create a new address
	@PostMapping("/create")
	public ResponseEntity<AddressResponseDTO> createAddress(@RequestParam Long userId,
			@Valid @RequestBody AddressRequestDTO addressRequest) {
		AddressResponseDTO response = addressService.createAddress(userId, addressRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	//get all addresses
	@GetMapping("/get")
	public ResponseEntity<List<AddressResponseDTO>> getAllAddresses(@RequestParam Long userId) {
		List<AddressResponseDTO> addresslist = addressService.getAddresses(userId);
		return ResponseEntity.ok(addresslist);
	}
	
	@PutMapping("/edit")
	public ResponseEntity<AddressResponseDTO> editAddress(@RequestParam Long userId, @RequestParam Long addressId, @Valid @RequestBody AddressRequestDTO addressRequestDTO){
		AddressResponseDTO response = addressService.editMyAddress(userId, addressId, addressRequestDTO);
//		return ResponseEntity.status(HttpStatus.OK)
		return ResponseEntity.ok(response);
	}
	
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
