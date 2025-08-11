package com.bookstore.bookstore_backend.config;

import java.security.Key;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.apache.tomcat.util.buf.UDecoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {
	@Value("${SECRET_KEY}")
	private String secretKeyBase64;

	@Value("${EXP_TIMEOUT:3600000}") // default 1 hour
	private long jwtExpirationMs;

	private Key key;

	@PostConstruct
	public void init() {
		try {
			byte[] keyBytes = Decoders.BASE64.decode(secretKeyBase64);
			key = Keys.hmacShaKeyFor(keyBytes);
			log.debug("Key {} Exp Time {}", keyBytes.length, jwtExpirationMs);
		} catch (Exception e) {
			log.error("Failed to initialize JWT signing key: {}", e.getMessage());
			throw new IllegalStateException("Invalid JWT secret key configuration", e);
		}
	}

	public String generateTokenFromAuthentication(Authentication authentication) {
		Object principal = authentication.getPrincipal();
		String subject;

		List<String> auths;
		if (principal instanceof UserDetails) {
			UserDetails ud = (UserDetails) principal;
			subject = ud.getUsername();
			auths = ud.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
		}
		else {
			subject = String.valueOf(principal);
			auths = List.of();
		}
		return generateToken(subject,auths);
	}

}
