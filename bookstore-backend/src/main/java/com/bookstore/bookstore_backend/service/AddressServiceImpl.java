package com.bookstore.bookstore_backend.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore.bookstore_backend.custom_exceptions.AddressNotFoundException;
import com.bookstore.bookstore_backend.custom_exceptions.UserNotFoundException;
import com.bookstore.bookstore_backend.dao.AddressDao;
import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.dto.AddressRequestDTO;
import com.bookstore.bookstore_backend.dto.AddressResponseDTO;
import com.bookstore.bookstore_backend.entities.AddressEntity;
import com.bookstore.bookstore_backend.entities.Label;
import com.bookstore.bookstore_backend.entities.UserEntity;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
	private final AddressDao addressDao;
	private final UserDao userDao;
	private final ModelMapper mapper;

	@Transactional
	@Override
	public AddressResponseDTO createAddress(Long userId, @Valid AddressRequestDTO addressRequestDTO) {
		// find user's id
		UserEntity userEntity = userDao.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User ID does not exists"));

		// DTO->Entity
		AddressEntity addressEntity = mapper.map(addressRequestDTO, AddressEntity.class);

		Label labelEnum;
		try {
			labelEnum = Label.valueOf(addressRequestDTO.getLabel().toUpperCase());
		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException("Invalid label value. Must be one of: HOME, OFFICE, OTHERS");
		}

		addressEntity.setLabel(labelEnum);
		addressEntity.setUser(userEntity); // assuming a @ManyToOne with UserEntity

		AddressEntity savedAddress = addressDao.save(addressEntity);
		return mapper.map(savedAddress, AddressResponseDTO.class);

	}

	@Transactional
	@Override
	public List<AddressResponseDTO> getAddresses(Long userId) {
		// find user's id
		UserEntity userEntity = userDao.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User ID does not exists"));

		// Get all addresses for debugging
		List<AddressEntity> allAddresses = addressDao.findByUser(userEntity);
		System.out.println("Service: Found " + allAddresses.size() + " total addresses for user " + userId);
		allAddresses.forEach(addr -> System.out.println("Service: Address ID " + addr.getId() + " - isActive: " + addr.getIsActive()));

		// Get only active addresses
		List<AddressEntity> addresses = addressDao.findByUserAndIsActiveTrue(userEntity);
		System.out.println("Service: Found " + addresses.size() + " active addresses for user " + userId);

		// mapping entities -> DTOs
		return addresses.stream().map(address -> {
			AddressResponseDTO dto = mapper.map(address, AddressResponseDTO.class);
			dto.setLabel(address.getLabel().name()); // to convert enum to String for FE
			return dto;
		}).toList();

	}

	@Transactional
	@Override
	public AddressResponseDTO editMyAddress(Long userId, Long addressId, @Valid AddressRequestDTO addressRequestDTO) {
		AddressEntity addressEntity = addressDao.findById(addressId)
				.orElseThrow(() -> new AddressNotFoundException("Address does not exists"));

		if (!addressEntity.getUser().getId().equals(userId))
			throw new IllegalArgumentException("This address does not belong to the given user");

		// DTO -> entity
		mapper.map(addressRequestDTO, addressEntity);

		Label label;
		try {
			label = Label.valueOf(addressRequestDTO.getLabel().toUpperCase());
		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException("Invalid label value. Must be one of: HOME, OFFICE, OTHERS");
		}

		addressEntity.setLabel(label);

		// save and return
		AddressEntity savedUpdatedAddress = addressDao.save(addressEntity);
		return mapper.map(savedUpdatedAddress, AddressResponseDTO.class);
	}

	@Transactional
	@Override
	public void softDeleteAddress(Long userId, Long addressId) {
		System.out.println("Service: Starting soft delete - User ID: " + userId + ", Address ID: " + addressId);
		
		AddressEntity addressEntity = addressDao.findById(addressId)
				.orElseThrow(() -> new AddressNotFoundException("Address does not exists"));

		System.out.println("Service: Found address - ID: " + addressEntity.getId() + ", User ID: " + addressEntity.getUser().getId());

		if (!addressEntity.getUser().getId().equals(userId))
			throw new IllegalArgumentException("This address does not belong to the given user");
		
		System.out.println("Service: Setting isActive to false for address ID: " + addressId);
		addressEntity.setIsActive(false);
		AddressEntity savedEntity = addressDao.save(addressEntity);
		
		System.out.println("Service: Address soft deleted successfully - ID: " + savedEntity.getId() + ", isActive: " + savedEntity.getIsActive());

	}

}
