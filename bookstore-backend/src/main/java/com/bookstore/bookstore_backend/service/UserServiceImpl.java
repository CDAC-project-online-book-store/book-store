package com.bookstore.bookstore_backend.service;

import java.util.List;
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
//		check if role is present in signupRequest, if not set to CUSTOMER
		if (signupRequest.getRole() != null) {
			try {
				entity.setRole(signupRequest.getRole());
			} catch (IllegalArgumentException e) {
				throw new IllegalArgumentException("Invalid role specified");
			}
		} else {
			// default role
			entity.setRole(UserRole.CUSTOMER);
		}
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

	@Override
	public List<UserResponseDTO> getAllUsers() {
		List<UserResponseDTO> userList = userDao.findAll().stream()
				.map(user -> {
					UserResponseDTO responseDTO = modelMapper.map(user, UserResponseDTO.class);
					responseDTO.setRole(user.getRole().name());
					return responseDTO;
				}).toList();
		return userList;
	}

	@Override
	public UserResponseDTO updateUserByAdmin(Long userId, com.bookstore.bookstore_backend.dto.SignupRequestDTO updateRequest) {
		UserEntity user = userDao.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User " + userId + " not found"));

		if (updateRequest.getUserName() != null && !updateRequest.getUserName().isBlank())
			user.setUserName(updateRequest.getUserName().trim());

		if (updateRequest.getPassword() != null && !updateRequest.getPassword().isBlank())
			user.setPassword(passwordEncoder.encode(updateRequest.getPassword()));

		if (updateRequest.getPhoneNumber() != null && !updateRequest.getPhoneNumber().isBlank())
			user.setPhoneNumber(updateRequest.getPhoneNumber().trim());

		if (updateRequest.getEmail() != null && !updateRequest.getEmail().isBlank())
			user.setEmail(updateRequest.getEmail().trim());

		if (updateRequest.getRole() != null)
			user.setRole(updateRequest.getRole());

		UserEntity savedUser = userDao.save(user);
		return modelMapper.map(savedUser, UserResponseDTO.class);
	}




	@Override
	public UserResponseDTO deactivateUser(Long userId) {
		UserEntity user = userDao.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User " + userId + " not found"));

		user.setIsActive(false);
		UserEntity savedUser = userDao.save(user);
		return modelMapper.map(savedUser, UserResponseDTO.class);
	}

}
