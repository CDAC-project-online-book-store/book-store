package com.bookstore.bookstore_backend.entities;

import java.time.LocalDateTime;
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
import lombok.ToString;

@Entity
@Table(name = "category")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = { "books" })
public class CategoryEntity extends BaseEntity {

	@Column(name = "name", nullable = false, unique = true)
	private String name;

	@Column(name = "description", length = 500)
	private String description;

	@ManyToMany(mappedBy = "categories")
	private Set<BookEntity> books = new HashSet<>();

	public CategoryEntity(Long id, LocalDateTime createdOn, LocalDateTime updatedOn, Boolean isActive, String name,
			String description) {
		super(id, createdOn, updatedOn, isActive);
		this.name = name;
		this.description = description;
	}

}
