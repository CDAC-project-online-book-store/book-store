package com.bookstore.bookstore_backend.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.ManyToMany;

public class AuthorEntity {

	@ManyToMany(mappedBy = "authors")
	private Set<BookEntity> books = new HashSet<>();
	
}
