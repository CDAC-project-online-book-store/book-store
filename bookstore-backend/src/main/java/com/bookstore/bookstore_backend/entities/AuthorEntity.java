package com.bookstore.bookstore_backend.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "author", 
	   indexes = { @Index(name = "idx_author_name", columnList = "author")}) // for name-based search})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "books" })
public class AuthorEntity extends BaseEntity {

	@Column(name = "author", nullable = false, length = 100)
	private String author;

	@Column(name = "bio")
	private String bio;

	@Column(name = "website", length = 500)
	private String website;

	@Column(name = "nationality", length = 50)
	private String nationality;

	@ManyToMany(mappedBy = "authors")
	private Set<BookEntity> books = new HashSet<>();

	public AuthorEntity(Long id, LocalDateTime createdOn, LocalDateTime updatedOn, Boolean isActive, String author,
			String bio, String website, String nationality) {
		super(id, createdOn, updatedOn, isActive);
		this.author = author;
		this.bio = bio;
		this.website = website;
		this.nationality = nationality;
	}

}
