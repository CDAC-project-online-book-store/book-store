package com.bookstore.bookstore_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.AdminCreateBookDTO;
import com.bookstore.bookstore_backend.dto.AdminUpdateBookDTO;
import com.bookstore.bookstore_backend.dto.BookRespDTO;
import com.bookstore.bookstore_backend.entities.BookDTO;
import com.bookstore.bookstore_backend.service.BookService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
//@PreAuthorize("hasRole('ADMIN')") // Uncomment this line to restrict access to ADMIN role
@AllArgsConstructor
public class AdminBookController {
	
	@Autowired
	private final BookService bookService;

	@PostMapping
	@Operation(summary = "Create a new book")
	public ResponseEntity<?> createBook(@Valid @RequestBody AdminCreateBookDTO newBookDTO){
		BookRespDTO created = bookService.createBook(newBookDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}
	
	//method for updating book details
	
	@PutMapping("/books/{id}")
	public ResponseEntity<?> updateBook(@PathVariable Long id, @Valid @RequestBody AdminUpdateBookDTO updatedBookDTO) {
		BookRespDTO updatedBook = bookService.updateBook(id, updatedBookDTO);
		return ResponseEntity.ok(updatedBook);
	}
	
	//method for deleting(soft delete) a book by id
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deactivateBook(@PathVariable Long id) {
		bookService.softDeleteBook(id);
		return ResponseEntity.noContent().build();
	}
}
