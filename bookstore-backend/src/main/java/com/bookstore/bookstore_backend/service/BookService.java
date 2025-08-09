package com.bookstore.bookstore_backend.service;

import java.util.List;

import com.bookstore.bookstore_backend.dto.AdminCreateBookDTO;
import com.bookstore.bookstore_backend.dto.AdminUpdateBookDTO;
import com.bookstore.bookstore_backend.dto.BookRespDTO;
import com.bookstore.bookstore_backend.entities.Format;

import jakarta.validation.Valid;

public interface BookService {
	List<BookRespDTO> getAllBooks();

	List<BookRespDTO> getAllBooksIncludingInactive();

	BookRespDTO getBookByIsbn(String isbn);
	BookRespDTO getBookById(Long id);

	List<BookRespDTO> searchBooksByTitle(String keyword);

	List<BookRespDTO> getBooksSortedByPriceAsc();

	List<BookRespDTO> getBooksSortedByPriceDesc();

	List<BookRespDTO> getBooksByPriceRange(double minPrice, double maxPrice);

	List<BookRespDTO> getBooksByFormat(Format format);

	List<BookRespDTO> getBooksByLanguage(String language);

	List<BookRespDTO> getBooksWithHighRating();

	BookRespDTO createBook(@Valid AdminCreateBookDTO bookDTO);

	BookRespDTO updateBook(Long id, @Valid AdminUpdateBookDTO bookDTO);

	void softDeleteBook(Long id);
}
