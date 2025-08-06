package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.CategoryDTO;
import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();
    CategoryDTO addCategory(CategoryDTO categoryDTO);
    CategoryDTO addCategoryToBook(Long bookId, CategoryDTO dto);
}
