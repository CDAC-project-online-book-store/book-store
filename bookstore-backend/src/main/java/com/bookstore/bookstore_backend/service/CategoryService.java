package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.CategoryDTO;

public interface CategoryService {

	CategoryDTO addCategoryToBook(Long bookId, CategoryDTO dto);

}
