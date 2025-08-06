package com.bookstore.bookstore_backend.dto;

import java.time.LocalDate;

import com.bookstore.bookstore_backend.entities.Format;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
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

	// Add authors and categories for frontend display
	private java.util.List<String> authors;
	private java.util.List<String> categories;

	

}
