package com.bookstore.bookstore_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.BookRespDTO;
import com.bookstore.bookstore_backend.entities.Format;
import com.bookstore.bookstore_backend.service.BookService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = {"http://localhost:5173"}, allowCredentials = "true", maxAge = 48000)
@RestController
@RequestMapping("/book")
@AllArgsConstructor
@Validated
public class BookController {

	private final BookService bookService;

	@GetMapping
	@Operation(description = "Get all books")
	public ResponseEntity<?> listAvailableBooks() {
		System.out.println("in list");
		List<BookRespDTO> books = bookService.getAllBooks();
		if (books.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(books);
	}

	@GetMapping("/all")
	@Operation(description = "Books including out of stock")
	public ResponseEntity<List<BookRespDTO>> getAllBooksIncludingInactive() {
		List<BookRespDTO> books = bookService.getAllBooksIncludingInactive();
		return ResponseEntity.ok(books);
	}

	@GetMapping("/isbn/{isbn}")
	@Operation(description = "Get books by its ISBN no.")
	public ResponseEntity<?> getBookByIsbn(@PathVariable String isbn) {
		BookRespDTO book = bookService.getBookByIsbn(isbn);
		return ResponseEntity.ok(book);
	}

	@GetMapping("/{id}")
	@Operation(description = "Get book by ID")
	public ResponseEntity<?> getBookById(@PathVariable Long id) {
		BookRespDTO book = bookService.getBookById(id);
		if (book == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return ResponseEntity.ok(book);
	}

	@GetMapping("/search/title")
	@Operation(description = "Search books by title substring")
	public ResponseEntity<List<BookRespDTO>> searchBooks(@RequestParam String title) {
		return ResponseEntity.ok(bookService.searchBooksByTitle(title));
	}

	@GetMapping("/sort/price/asc")
	@Operation(description = "Book price (lowest to highest)")
	public List<BookRespDTO> getBooksSortedByPriceAsc() {
		return bookService.getBooksSortedByPriceAsc();
	}

	@GetMapping("/sort/price/desc")
	@Operation(description = "Book price (highest to lowest)")
	public List<BookRespDTO> getBooksSortedByPriceDesc() {
		return bookService.getBooksSortedByPriceDesc();
	}

	@GetMapping("/filter/price-range")
	@Operation(description = "Book price within range (min price and max price)")
	public List<BookRespDTO> getBooksByPriceRange(@RequestParam double minPrice, @RequestParam double maxPrice) {
		return bookService.getBooksByPriceRange(minPrice, maxPrice);
	}

	@GetMapping("/filter/format")
	@Operation(description = "Book by its format")
	public List<BookRespDTO> getBooksByFormat(@RequestParam Format format) {
		return bookService.getBooksByFormat(format);
	}

	@GetMapping("/filter/language")
	@Operation(description = "Book by its language")
	public List<BookRespDTO> getBooksByLanguage(@RequestParam String language) {
		return bookService.getBooksByLanguage(language);
	}

	@GetMapping("/books/rating")
	@Operation(description = "Books with rating >= 4.0")
	public ResponseEntity<List<BookRespDTO>> getBooksWithHighRating() {
		List<BookRespDTO> books = bookService.getBooksWithHighRating();
		return ResponseEntity.ok(books);
	}

}
