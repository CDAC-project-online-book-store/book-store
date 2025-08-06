package com.bookstore.bookstore_backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.custom_exceptions.ResourceNotFoundException;
import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dao.CategoryDao;
import com.bookstore.bookstore_backend.dto.CategoryDTO;
import com.bookstore.bookstore_backend.entities.BookEntity;
import com.bookstore.bookstore_backend.entities.CategoryEntity;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryDao categoryDao;
	private final BookDao bookDao;
	private final ModelMapper modelMapper;

	@Override
	public CategoryDTO addCategoryToBook(Long bookId, CategoryDTO dto) {

		BookEntity bookEntity = bookDao.findById(bookId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid category id - category cannot be assigned"));
		CategoryEntity categoryEntity = modelMapper.map(dto, CategoryEntity.class);

		bookEntity.addCategory(categoryEntity);

		categoryDao.save(categoryEntity);

		return modelMapper.map(categoryEntity, CategoryDTO.class);
	}
}
