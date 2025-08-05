package com.bookstore.bookstore_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dto.BookRespDTO;
import com.bookstore.bookstore_backend.entities.BookEntity;
import com.bookstore.bookstore_backend.entities.Format;

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

	@Override
	public List<BookRespDTO> getAllBooksIncludingInactive() {
		List<BookEntity> books = bookDao.findAll();

		return books.stream().map(this::mapToDto).collect(Collectors.toList());
	}

	private BookRespDTO mapToDto(BookEntity entity) {
		BookRespDTO dto = new BookRespDTO();
		dto.setId(entity.getId());
		dto.setTitle(entity.getTitle());
		dto.setDescription(entity.getDescription());
		dto.setPrice(entity.getPrice());
		dto.setFormat(entity.getFormat()); // enum to string
		dto.setIsActive(entity.getIsActive());
		dto.setIsbn(entity.getIsbn());
		dto.setLanguage(entity.getLanguage());
		dto.setPublicationDate(entity.getPublicationDate());
		dto.setPublisher(entity.getPublisher());
		dto.setStockQuantity(entity.getStockQuantity());
		dto.setRating(entity.getRating());
		dto.setCoverImageUrl(entity.getCoverImageUrl());
		dto.setEdition(entity.getEdition());
		return dto;
	}

	@Override
	public BookRespDTO getBookByIsbn(String isbn) {
		BookEntity book = bookDao.findByIsbn(isbn)
				.orElseThrow(() -> new RuntimeException("Book with ISBN " + isbn + " not found"));
		return modelMapper.map(book, BookRespDTO.class);
	}

	@Override
	public List<BookRespDTO> searchBooksByTitle(String keyword) {
		return bookDao.findByTitleContainingIgnoreCaseAndIsActiveTrue(keyword).stream()
				.map(book -> modelMapper.map(book, BookRespDTO.class)).toList();
	}

	@Override
	public List<BookRespDTO> getBooksSortedByPriceAsc() {
		return bookDao.findAllByOrderByPriceAsc().stream().map(book -> modelMapper.map(book, BookRespDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<BookRespDTO> getBooksSortedByPriceDesc() {
		return bookDao.findAllByOrderByPriceDesc().stream().map(book -> modelMapper.map(book, BookRespDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<BookRespDTO> getBooksByPriceRange(double minPrice, double maxPrice) {
		return (List<BookRespDTO>) bookDao.findByPriceBetween(minPrice, maxPrice).stream()
				.map(book -> modelMapper.map(book, BookRespDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<BookRespDTO> getBooksByFormat(Format format) {
		return bookDao.findByFormat(format).stream().map(book -> modelMapper.map(book, BookRespDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<BookRespDTO> getBooksByLanguage(String language) {
		List<BookEntity> books = bookDao.findByLanguageIgnoreCase(language);
		return books.stream().map(book -> modelMapper.map(book, BookRespDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<BookRespDTO> getBooksWithHighRating() {
		Double minRating = 4.0;
		List<BookEntity> entities = bookDao.findByRatingGreaterThanEqual(minRating);

		return entities.stream().map(entity -> modelMapper.map(entity, BookRespDTO.class)).collect(Collectors.toList());
	}

}
