package com.bookstore.bookstore_backend.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "author")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class AuthorEntity extends BaseEntity {

	@ManyToMany(mappedBy = "authors")
	private Set<BookEntity> books = new HashSet<>();

	@Column(name = "author", nullable = false, length = 100)
	private String author;

	@Column(name = "bio", nullable = false)
	private String bio;

	@Column(name = "website", nullable = false, length = 500)
	private String website;

	@Column(name = "nationality", nullable = false, length = 50)
	private String nationality;

}
