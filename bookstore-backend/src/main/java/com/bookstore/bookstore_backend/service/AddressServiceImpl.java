package com.bookstore.bookstore_backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

		AddressEntity savedAddress =  addressDao.save(addressEntity);
		return mapper.map(savedAddress, AddressResponseDTO.class);
	
	}

}
