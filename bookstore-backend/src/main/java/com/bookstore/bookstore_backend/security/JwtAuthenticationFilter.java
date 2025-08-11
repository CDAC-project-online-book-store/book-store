package com.bookstore.bookstore_backend.security;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final JwtUtils jwtUtils;
//	private final UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		final String token = authHeader.substring(7);
		String username = null;

		try {
			username = jwtUtils.extractUsername(token);
		} catch (ExpiredJwtException e) {
			log.warn("Expired JWT token for request {}: {}", request.getRequestURI(), e.getMessage());
			response.setHeader("X-Token-Expired", "true");
			filterChain.doFilter(request, response);
			return;
		} catch (JwtException e) {
			log.warn("Invalid JWT token for request {}: {}", request.getRequestURI(), e.getMessage());
			filterChain.doFilter(request, response);
			return;
		}

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			if (jwtUtils.validateToken(token, username)) {
				List<String> authNames = jwtUtils.extractAuthorities(token);

				var authorities = authNames.stream().map(auth -> auth.startsWith("ROLE_") ? auth : "ROLE_" + auth)
						.map(SimpleGrantedAuthority::new).toList();

				var auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
				SecurityContextHolder.getContext().setAuthentication(auth);
				log.debug("Authenticated user {} via JWT (claims only, no DB hit)", username);
			} else {
				log.debug("Token validation failed for {}", username);
			}
		}

//		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//			var userDetails = userDetailsService.loadUserByUsername(username);
//
//			if (jwtUtils.validateToken(token, userDetails.getUsername())) {
//				List<String> authNames = jwtUtils.extractAuthorities(token);
//				var authorities = authNames.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
//				var auth = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
//				SecurityContextHolder.getContext().setAuthentication(auth);
//				log.debug("Authenticated user {} via JWT", username);
//			}
//			else {
//				log.debug("Token validation failed for {}", username);
//			}
//		}

		filterChain.doFilter(request, response);

	}
}
