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
@Table(name = "category")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CategoryEntity extends BaseEntity {
	
	@Column(name = "name", nullable = false, unique = true)
	private String name;
	
	@Column(name = "description", length = 500)
	private String description;
	
	@ManyToMany(mappedBy = "categories") // Many-to-many relationship with BookEntity)
	private Set<BookEntity> books = new HashSet<>(); // Many-to-many relationship with BookEntity
	
}
