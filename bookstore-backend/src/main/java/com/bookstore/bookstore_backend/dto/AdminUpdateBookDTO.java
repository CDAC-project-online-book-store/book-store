package com.bookstore.bookstore_backend.dto;

import java.util.Set;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminUpdateBookDTO {
	// Fields that can be updated
	@Size(max = 1000, message = "Title must be at most 1000 characters long")
	private String description;
	@Min(value = 0, message = "Price must be a positive number")
	private Double price;
	
	@Min(value = 0, message = "Stock quantity must be a non-negative number")
	private Integer stockQuantity;
	
	private Boolean isActive;
	private Set<Long> categoryIds;
}
