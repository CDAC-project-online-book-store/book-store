package com.bookstore.bookstore_backend.security;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtils {

    @Value("${SECRET_KEY}")
    private String secretKeyBase64;

    @Value("${EXP_TIMEOUT:3600000}")
    private long jwtExpirationMs;

    private Key key;

    @PostConstruct
    public void init() {
        try {
            byte[] keyBytes = Decoders.BASE64.decode(secretKeyBase64);
            
            if(keyBytes.length<32)
            	throw new IllegalStateException("JWT secret key must be at least 256 bits (32 bytes) for HS256");
            
            key = Keys.hmacShaKeyFor(keyBytes);
            log.debug("JwtUtils initialized (keyBytes={} expMs={})", keyBytes.length, jwtExpirationMs);
        } catch (Exception e) {
            log.error("Failed to init JWT key: {}", e.getMessage());
            throw new IllegalStateException("Invalid JWT secret key", e);
        }
    }

    // Create token from Authentication (subject = username/email)
    public String generateTokenFromAuthentication(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        String subject;
        List<String> auths;
        if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
            var ud = (org.springframework.security.core.userdetails.UserDetails) principal;
            subject = ud.getUsername();
            auths = ud.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        } else {
            subject = String.valueOf(principal);
            auths = List.of();
        }
        return generateToken(subject, auths);
    }

    public String generateToken(String subject, List<String> authorities) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + jwtExpirationMs);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(exp)
                .claim("authorities", authorities)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractAllClaims(String token) throws JwtException {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            log.warn("JWT expired: {}", e.getMessage());
            throw e;
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException e) {
            log.warn("Invalid JWT: {}", e.getMessage());
            throw e;
        } catch (IllegalArgumentException e) {
            log.warn("JWT arg invalid: {}", e.getMessage());
            throw e;
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        final Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    // canonical name used across the code: returns subject (email)
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public List<String> extractAuthorities(String token) {
        Claims claims = extractAllClaims(token);
        Object authObj = claims.get("authorities");
        if (authObj instanceof List<?> list) {
            return list.stream()
                       .filter(String.class::isInstance)
                       .map(String.class::cast)
                       .toList();
        }
        return List.of();
    }

    public boolean isTokenExpired(String token) {
        try {
            return extractClaim(token, Claims::getExpiration).before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    public boolean validateToken(String token, String username) {
        try {
            final String extracted = extractUsername(token);
            return extracted.equals(username) && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.debug("Token validation failed: {}", e.getMessage());
            return false;
        }
    }

    public Claims validateAndGetClaims(String token) throws JwtException {
        return extractAllClaims(token);
    }
}
