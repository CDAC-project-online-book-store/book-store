package com.bookstore.bookstore_backend.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.entities.UserEntity; 

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	private final UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserEntity user = userDao.findByEmail(email)
				.orElseThrow(()->{
					log.warn("User not found by email: {}", email);
					return new UsernameNotFoundException("User not found with email: " + email);
				});
		log.debug("Loaded user: {}", email);
		return new UserDetailsAdapter(user);
	}
	
}
