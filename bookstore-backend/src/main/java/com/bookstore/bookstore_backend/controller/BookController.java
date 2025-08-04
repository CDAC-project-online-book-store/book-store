package com.bookstore.bookstore_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.BookRespDTO;
import com.bookstore.bookstore_backend.service.BookService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/book")
@AllArgsConstructor
@Validated
public class BookController {

	private final BookService bookService;

	@GetMapping
	public ResponseEntity<?> listAvailableBooks() {
		System.out.println("in list");
		List<BookRespDTO> books = bookService.getAllBooks();
		if (books.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(books);

	}
}
