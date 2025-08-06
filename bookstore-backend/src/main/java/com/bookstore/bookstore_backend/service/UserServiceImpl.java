package com.bookstore.bookstore_backend.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.dto.SignupRequestDTO;
import com.bookstore.bookstore_backend.dto.UserResponseDTO;
import com.bookstore.bookstore_backend.entities.UserEntity;
import com.bookstore.bookstore_backend.entities.UserRole;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService{
	private final UserDao userDao;
	private final PasswordEncoder passwordEncoder;
	private final ModelMapper modelMapper;
	
	public UserServiceImpl(UserDao userDao,PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
		this.userDao = userDao;
		this.passwordEncoder=passwordEncoder;
		this.modelMapper=modelMapper;
	}
	
	@Transactional
	@Override
	public UserResponseDTO signup(SignupRequestDTO signupRequest) {
		Optional<UserEntity> existingUser = userDao.findByEmail(signupRequest.getEmail());
		if(existingUser.isPresent()) {
			throw new IllegalArgumentException("Email already exists");
		}
		
		UserEntity entity = modelMapper.map(signupRequest, UserEntity.class);
		
		entity.setUserName(signupRequest.getUserName());
		entity.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
		entity.setPhoneNumber(signupRequest.getPhoneNumber());
		entity.setRole(UserRole.CUSTOMER);
		entity.setIsActive(true);
		
		UserEntity savedUser = userDao.save(entity);
		
		return modelMapper.map(savedUser, UserResponseDTO.class);
	}

}
