package com.bookstore.bookstore_backend.controller;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.CategoryDTO;
import com.bookstore.bookstore_backend.service.CategoryService;

@CrossOrigin(origins = {"http://localhost:5173"}, allowCredentials = "true", maxAge = 48000)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	/**
	 * Get all categories.
	 * @return List of all categories
	 */
	@Operation(summary = "Get all categories", description = "Returns a list of all book categories.")
	@GetMapping
	public List<CategoryDTO> getAllCategories() {
		return categoryService.getAllCategories();
	}

	/**
	 * Add a new category.
	 * @param categoryDTO Category details
	 * @return Created category
	 */
	@Operation(summary = "Add a new category", description = "Creates and returns a new book category.")
	@PostMapping
	public CategoryDTO addCategory(@RequestBody CategoryDTO categoryDTO) {
		return categoryService.addCategory(categoryDTO);
	}

	/**
	 * Add a category to a book.
	 * @param bookId Book ID
	 * @param dto Category details
	 * @return Created category
	 */
	@Operation(summary = "Add category to book", description = "Adds a category to the specified book and returns the category.")
	@PostMapping("/{bookId}")
	public ResponseEntity<CategoryDTO> addCategory(@PathVariable Long bookId, @RequestBody CategoryDTO dto) {
		CategoryDTO createdCategory = categoryService.addCategoryToBook(bookId, dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
	}

}
