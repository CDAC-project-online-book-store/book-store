package com.bookstore.bookstore_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.CategoryDTO;
import com.bookstore.bookstore_backend.service.CategoryService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/categories")
@AllArgsConstructor
public class CategoryController {

	private final CategoryService categoryService;

	@PostMapping("/{bookId}")
	public ResponseEntity<CategoryDTO> addCategory(@PathVariable Long bookId, @RequestBody CategoryDTO dto) {
		CategoryDTO createdCategory = categoryService.addCategoryToBook(bookId, dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
	}
}
