package com.bookstore.bookstore_backend.service;

import java.util.List;

import com.bookstore.bookstore_backend.dto.BookRespDTO;

public interface BookService {
	List<BookRespDTO> getAllBooks();
}
