package com.bookstore.bookstore_backend.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dto.BookRespDTO;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookServiceImpl implements BookService {

	private final BookDao bookDao;
	private final ModelMapper modelMapper;

	@Override
	public List<BookRespDTO> getAllBooks() {

		return bookDao.findByIsActiveTrue().stream().map(book -> modelMapper.map(book, BookRespDTO.class)).toList();
	}
}
