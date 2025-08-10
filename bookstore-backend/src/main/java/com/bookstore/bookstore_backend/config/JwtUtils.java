package com.bookstore.bookstore_backend.config;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

//import javax.crypto.SecretKey;

//import org.apache.tomcat.util.buf.UDecoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
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
		} else {
			subject = String.valueOf(principal);
			auths = List.of();
		}
		return generateToken(subject, auths);
	}

	private String generateToken(String subject, List<String> auths) {
		return Jwts.builder().setSubject(subject).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)).claim("authorities", auths)
				.signWith(key, SignatureAlgorithm.HS256).compact();
	}

	public Claims extractAllClaims(String token) throws JwtException {
		try {
			return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
		} catch (ExpiredJwtException e) {
			log.warn("JWT expired: {}", e.getMessage());
			throw e;
		} catch (SignatureException | MalformedJwtException | UnsupportedJwtException e) {
			log.warn("Invalid JWT signature / format: {}", e.getMessage());
			throw e;
		} catch (IllegalArgumentException e) {
			log.warn("JWT invalid argument: {}", e.getMessage());
			throw e;
		}

	}

	public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		final Claims claims = extractAllClaims(token);
		return claimResolver.apply(claims);
	}

	public String extractEmail(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public List<String> extractAuthorities(String token) {
		Claims claims = extractAllClaims(token);
		Object authObject = claims.get("authorities");
		if (authObject instanceof List) {
			return (List<String>) authObject;
		}
		return List.of();
	}

	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
		Object authObject = claims.get("authorities");
		if (authObject instanceof List) {
			var list = (List<String>) authObject;
			return list.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());

		}
		return List.of();
	}

	public boolean isTokenExpired(String token) {
		try {
			return extractClaim(token, Claims::getExpiration).before(new Date());
		} catch (Exception e) {
			return true;
		}
	}
	
	public boolean validateToken(String token, String email) {
		try {
			final String extractedEmailString = extractEmail(token);
			return (extractedEmailString.equals(email)) && !isTokenExpired(token);
		} catch (JwtException | IllegalArgumentException e) {
			log.debug("Token validation failed: {}", e.getMessage());
			return false;
		}
	}
	
	 public Claims validateAndGetClaims(String token) throws JwtException {
	        return extractAllClaims(token);
	    }
	
	

}
