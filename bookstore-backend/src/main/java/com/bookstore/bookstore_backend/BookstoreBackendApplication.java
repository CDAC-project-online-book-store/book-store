package com.bookstore.bookstore_backend;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BookstoreBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookstoreBackendApplication.class, args);
	}

	@Bean
	ModelMapper modelMapper() {
		System.out.println("creating model mapper");
		ModelMapper mapper = new ModelMapper();
		// to transfer only properties matching by name
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT)
				// transfer not null props
				.setPropertyCondition(Conditions.isNotNull());
		return mapper;
	}

}
