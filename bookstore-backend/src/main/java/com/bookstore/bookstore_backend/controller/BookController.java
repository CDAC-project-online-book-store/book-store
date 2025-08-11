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
	@Operation(summary = "Get all active books", description = "Returns all active books available in the store.")
	public ResponseEntity<?> listAvailableBooks() {
		System.out.println("in list");
		List<BookRespDTO> books = bookService.getAllBooks();
		if (books.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.ok(books);
	}

	@GetMapping("/search")
	@Operation(summary = "Search and filter books", description = "Search and filter books by title, category, author, and price range.")
	public ResponseEntity<List<BookRespDTO>> searchBooks(
			@RequestParam(required = false) String title,
			@RequestParam(required = false) String category,
			@RequestParam(required = false) String author,
			@RequestParam(required = false) Double priceMin,
			@RequestParam(required = false) Double priceMax
	) {
		List<BookRespDTO> books = bookService.searchBooks(title, category, author, priceMin, priceMax);
		return ResponseEntity.ok(books);
	}

	@GetMapping("/all")
	@Operation(summary = "Get all books including inactive", description = "Returns all books, including those that are out of stock or inactive.")
	public ResponseEntity<List<BookRespDTO>> getAllBooksIncludingInactive() {
		List<BookRespDTO> books = bookService.getAllBooksIncludingInactive();
		return ResponseEntity.ok(books);
	}

	@GetMapping("/isbn/{isbn}")
	@Operation(summary = "Get book by ISBN", description = "Returns book details for the specified ISBN number.")
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
	@Operation(summary = "Search books by title", description = "Returns books whose title contains the specified substring.")
	public ResponseEntity<List<BookRespDTO>> searchBooks(@RequestParam String title) {
		return ResponseEntity.ok(bookService.searchBooksByTitle(title));
	}

	@GetMapping("/sort/price/asc")
	@Operation(summary = "Sort books by price ascending", description = "Returns books sorted by price from lowest to highest.")
	public List<BookRespDTO> getBooksSortedByPriceAsc() {
		return bookService.getBooksSortedByPriceAsc();
	}

	@GetMapping("/sort/price/desc")
	@Operation(summary = "Sort books by price descending", description = "Returns books sorted by price from highest to lowest.")
	public List<BookRespDTO> getBooksSortedByPriceDesc() {
		return bookService.getBooksSortedByPriceDesc();
	}

	@GetMapping("/filter/price-range")
	@Operation(summary = "Filter books by price range", description = "Returns books within the specified price range.")
	public List<BookRespDTO> getBooksByPriceRange(@RequestParam double minPrice, @RequestParam double maxPrice) {
		return bookService.getBooksByPriceRange(minPrice, maxPrice);
	}

	@GetMapping("/filter/format")
	@Operation(summary = "Filter books by format", description = "Returns books matching the specified format.")
	public List<BookRespDTO> getBooksByFormat(@RequestParam Format format) {
		return bookService.getBooksByFormat(format);
	}

	@GetMapping("/filter/language")
	@Operation(summary = "Filter books by language", description = "Returns books matching the specified language.")
	public List<BookRespDTO> getBooksByLanguage(@RequestParam String language) {
		return bookService.getBooksByLanguage(language);
	}

	@GetMapping("/books/rating")
	@Operation(summary = "Get books with high rating", description = "Returns books with rating greater than or equal to 4.0.")
	public ResponseEntity<List<BookRespDTO>> getBooksWithHighRating() {
		List<BookRespDTO> books = bookService.getBooksWithHighRating();
		return ResponseEntity.ok(books);
	}

}
