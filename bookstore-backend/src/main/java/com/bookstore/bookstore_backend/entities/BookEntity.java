package com.bookstore.bookstore_backend.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "book")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookEntity extends BaseEntity {

	@Column(name = "title", nullable = false)
	private String title;

//	@Column(name = "author", nullable = false)
//	private String author;

	@Column(name = "isbn", unique = true, nullable = false)
	private String isbn;

	@Column(name = "publisher", nullable = false)
	private String publisher;

	@Column(name = "publication_date")
	private LocalDate publicationDate;

	@Column(name = "description", length = 1000)
	private String description;

	@Column(name = "edition")
	private String edition;

	@Column(name = "language", length = 50)
	private String language;

	@Column(name = "cover_image_url")
	private String coverImageUrl;

	@Column(name = "price", nullable = false)
	private Double price;

	@Column(name = "stock_quantity", nullable = false)
	private Integer stockQuantity;

	@Enumerated(EnumType.STRING)
	@Column(name = "format", nullable = false)
	private Format format;

	@Column(name = "is_active", nullable = false)
	private Boolean isActive = true;

	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItemEntity> orderItems;

	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ReviewEntity> reviews;

	@ManyToMany
	@JoinTable(name = "book_category", // join table name
			joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<CategoryEntity> categories = new HashSet<>();

	@ManyToMany
	@JoinTable(name = "book_author", // join table name
			joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
	private Set<AuthorEntity> authors = new HashSet<>();

}
