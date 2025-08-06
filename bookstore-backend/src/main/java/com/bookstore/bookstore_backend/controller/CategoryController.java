package com.bookstore.bookstore_backend.controller;

import com.bookstore.bookstore_backend.dto.CategoryDTO;
import com.bookstore.bookstore_backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(maxAge = 48000) // Allow all origins for testing; adjust as needed for production
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping
	public List<CategoryDTO> getAllCategories() {
		return categoryService.getAllCategories();
	}

	@PostMapping
	public CategoryDTO addCategory(@RequestBody CategoryDTO categoryDTO) {
		return categoryService.addCategory(categoryDTO);
	}

	@PostMapping("/{bookId}")
	public ResponseEntity<CategoryDTO> addCategory(@PathVariable Long bookId, @RequestBody CategoryDTO dto) {
		CategoryDTO createdCategory = categoryService.addCategoryToBook(bookId, dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
	}
}
