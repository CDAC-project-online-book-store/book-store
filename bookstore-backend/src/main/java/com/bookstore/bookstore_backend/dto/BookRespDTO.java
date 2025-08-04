package com.bookstore.bookstore_backend.dto;

import java.time.LocalDate;

import com.bookstore.bookstore_backend.entities.Format;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class BookRespDTO extends BaseDTO {

	private String title;
	private String isbn;
	private String publisher;
	private LocalDate publicationDate;
	private String description;
	private String edition;
	private String language;
	private String coverImageUrl;
	private Double price;
	private Integer stockQuantity;
	private Format format;
	private Boolean isActive = true;
	private Double rating;

	public BookRespDTO(String title, String isbn, String publisher, LocalDate publicationDate, String description,
			String edition, String language, String coverImageUrl, Double price, Integer stockQuantity, Format format,
			Boolean isActive, Double rating) {
		super();
		this.title = title;
		this.isbn = isbn;
		this.publisher = publisher;
		this.publicationDate = publicationDate;
		this.description = description;
		this.edition = edition;
		this.language = language;
		this.coverImageUrl = coverImageUrl;
		this.price = price;
		this.stockQuantity = stockQuantity;
		this.format = format;
		this.isActive = isActive;
		this.rating = rating;
	}

}
