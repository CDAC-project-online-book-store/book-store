package com.bookstore.bookstore_backend.dto;

import java.time.LocalDate;
import java.util.Set;

import com.bookstore.bookstore_backend.entities.Format;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class AdminCreateBookDTO {
	@NotBlank(message = "Title is required")
	private String title;
	@NotBlank(message = "ISBN is required")
	private String isbn;
	@NotBlank(message = "Publisher is required")
	private String publisher;
	
	private LocalDate publicationDate;
	private String description;
	private String edition;
	private String language;
	private String coverImageUrl;

	@NotNull(message = "Price is required")  
	Double price;
	@NotNull(message = "Stock quantity is required")  
	Integer stockQuantity;
	@NotNull(message = "Format is required")
	private Format format;
	private Boolean isActive = true;
	private Set<Long> authorIds;
	private Set<Long> categoryIds;

}
