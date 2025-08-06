package com.bookstore.bookstore_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@SuppressWarnings("removal")
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.csrf().disable()// disable CSRF for testing
			.authorizeHttpRequests(auth -> auth.anyRequest().permitAll() // allow all requests)
			);
		return http.build();
	}
	
}//note: This is a basic security configuration that disables CSRF protection and allows all requests. In a production application, you would typically want to implement more robust security measures, such as authentication and authorization mechanisms.
