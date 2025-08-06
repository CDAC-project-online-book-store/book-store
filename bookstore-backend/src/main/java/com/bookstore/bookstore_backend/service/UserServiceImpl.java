package com.bookstore.bookstore_backend.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore.bookstore_backend.custom_exceptions.InvalidCredentialsException;
import com.bookstore.bookstore_backend.custom_exceptions.UserNotFoundException;
import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.dto.LoginRequestDTO;
import com.bookstore.bookstore_backend.dto.ProfileDTO;
import com.bookstore.bookstore_backend.dto.SignupRequestDTO;
import com.bookstore.bookstore_backend.dto.UserResponseDTO;
import com.bookstore.bookstore_backend.entities.UserEntity;
import com.bookstore.bookstore_backend.entities.UserRole;


@Service
public class UserServiceImpl implements UserService {
	private final UserDao userDao;
	private final PasswordEncoder passwordEncoder;
	private final ModelMapper modelMapper;

	public UserServiceImpl(UserDao userDao, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
		this.userDao = userDao;
		this.passwordEncoder = passwordEncoder;
		this.modelMapper = modelMapper;
	}

	@Transactional
	@Override
	public UserResponseDTO signup(SignupRequestDTO signupRequest) {
		Optional<UserEntity> existingUser = userDao.findByEmail(signupRequest.getEmail());
		if (existingUser.isPresent()) {
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

	@Transactional(readOnly = true)
	@Override
	public UserResponseDTO login(LoginRequestDTO loginRequest) {
		UserEntity user = userDao.findByEmail(loginRequest.getEmail())
				.orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

		// for soft-deleted user
		if (Boolean.FALSE.equals(user.getIsActive()))
			throw new InvalidCredentialsException("Invalid email or password");

		// verify password
		if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
			throw new InvalidCredentialsException("Invalid email or password");

		UserResponseDTO responseDTO = modelMapper.map(user, UserResponseDTO.class);
		responseDTO.setRole(user.getRole().name());
		return responseDTO;
	}

	@Override
	public void updateUserProfile(ProfileDTO profileRequest, Long userId) {
		UserEntity user = userDao.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User " + userId + "not found"));

		if (profileRequest.getUserName() != null && !profileRequest.getUserName().isBlank())
			user.setUserName(profileRequest.getUserName().trim());

		if (profileRequest.getPassword() != null && !profileRequest.getPassword().isBlank())
			user.setPassword(passwordEncoder.encode(profileRequest.getPassword()));

		if (profileRequest.getPhoneNumber() != null && !profileRequest.getPhoneNumber().isBlank())
			user.setPhoneNumber(profileRequest.getPhoneNumber().trim());
		
		userDao.save(user);
	}

}
