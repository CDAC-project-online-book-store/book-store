package com.bookstore.bookstore_backend.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
import jakarta.persistence.Index;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(
    name = "book",
    indexes = {
        @Index(name = "idx_book_isbn",     columnList = "isbn"),     // unique also creates an index
        
        // If BaseEntity maps is_active column into this table and you want it indexed:
        // @Index(name = "idx_book_is_active", columnList = "is_active")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "orderItems", "reviews", "categories", "authors" })
public class BookEntity extends BaseEntity {

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "isbn", unique = true, nullable = false, length = 20)
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
	private double price;

	@Column(name = "stock_quantity", nullable = false)
	private Integer stockQuantity;

	@Enumerated(EnumType.STRING)
	@Column(name = "format", nullable = false)
	private Format format;

	@Column(name = "rating")
	private Double rating;

	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItemEntity> orderItems = new ArrayList<>();

	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ReviewEntity> reviews = new ArrayList<>();

	@ManyToMany
	@JoinTable(name = "book_category", // join table name
			joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<CategoryEntity> categories = new HashSet<>();

	@ManyToMany
	@JoinTable(name = "book_author", // join table name
			joinColumns = @JoinColumn(name = "book_id"), inverseJoinColumns = @JoinColumn(name = "author_id"))
	private Set<AuthorEntity> authors = new HashSet<>();

}
