package com.bookstore.bookstore_backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.custom_exceptions.ResourceNotFoundException;
import com.bookstore.bookstore_backend.dao.AuthorDao;
import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dao.CategoryDao;
import com.bookstore.bookstore_backend.dto.AdminCreateBookDTO;
import com.bookstore.bookstore_backend.dto.AdminUpdateBookDTO;
import com.bookstore.bookstore_backend.dto.BookRespDTO;
import com.bookstore.bookstore_backend.entities.AuthorEntity;
import com.bookstore.bookstore_backend.entities.BookEntity;
import com.bookstore.bookstore_backend.entities.CategoryEntity;
import com.bookstore.bookstore_backend.entities.Format;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookServiceImpl implements BookService {


	private final BookDao bookDao;
	private final AuthorDao authorDao;
	private final CategoryDao categoryDao;
	private final ModelMapper modelMapper;

	@Override
	public List<BookRespDTO> getAllBooks() {
		return bookDao.findByIsActiveTrue().stream().map(this::mapToDto).toList();
	}

	@Override
	public List<BookRespDTO> searchBooks(String title, String category, String author, Double priceMin, Double priceMax) {
		List<BookEntity> books = bookDao.findByIsActiveTrue();
		if (title != null && !title.isEmpty()) {
			books = books.stream().filter(b -> b.getTitle() != null && b.getTitle().toLowerCase().contains(title.toLowerCase())).toList();
		}
		if (category != null && !category.isEmpty()) {
			books = books.stream().filter(b -> b.getCategories().stream().anyMatch(c -> c.getName().equalsIgnoreCase(category))).toList();
		}
		if (author != null && !author.isEmpty()) {
			books = books.stream().filter(b -> b.getAuthors().stream().anyMatch(a -> a.getAuthor().equalsIgnoreCase(author))).toList();
		}
		if (priceMin != null) {
			books = books.stream().filter(b -> b.getPrice() >= priceMin).toList();
		}
		if (priceMax != null) {
			books = books.stream().filter(b -> b.getPrice() <= priceMax).toList();
		}
		return books.stream().map(this::mapToDto).toList();
	}

	@Override
	public List<BookRespDTO> getAllBooksIncludingInactive() {
		List<BookEntity> books = bookDao.findAll();
		if (books.isEmpty()) {
			throw new ResourceNotFoundException ("No books found");
		}
		return books.stream().map(b -> mapToDto(b)).collect(Collectors.toList());								
		//return books.stream().map(this::mapToDto).collect(Collectors.toList());
	}

	private BookRespDTO mapToDto(BookEntity entity) {
		BookRespDTO dto = new BookRespDTO();
		dto.setId(entity.getId());
		dto.setTitle(entity.getTitle());
		dto.setDescription(entity.getDescription());
		dto.setPrice(entity.getPrice());
		dto.setFormat(entity.getFormat());
		dto.setIsActive(entity.getIsActive());
		dto.setIsbn(entity.getIsbn());
		dto.setLanguage(entity.getLanguage());
		dto.setPublicationDate(entity.getPublicationDate());
		dto.setPublisher(entity.getPublisher());
		dto.setStockQuantity(entity.getStockQuantity());
		dto.setRating(entity.getRating());
		dto.setCoverImageUrl(entity.getCoverImageUrl());
		dto.setEdition(entity.getEdition());
		// Map authors
		dto.setAuthors(entity.getAuthors().stream().map(AuthorEntity::getAuthor).toList());
		// Map categories
		dto.setCategories(entity.getCategories().stream().map(CategoryEntity::getName).toList());
		return dto;
	}

	@Override
	public BookRespDTO getBookByIsbn(String isbn) {
		BookEntity book = bookDao.findByIsbn(isbn)
				.orElseThrow(() -> new RuntimeException("Book with ISBN " + isbn + " not found"));
		return mapToDto(book);
	}

	@Override
	public BookRespDTO getBookById(Long id) {
		BookEntity book = bookDao.findById(id).orElse(null);
		if (book == null) return null;
		return mapToDto(book);
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

	public BookRespDTO createBook(@Valid AdminCreateBookDTO bookDTO) {
		BookEntity newBookEntity = new BookEntity();
		newBookEntity.setTitle(bookDTO.getTitle());
		newBookEntity.setIsbn(bookDTO.getIsbn());
		newBookEntity.setPublisher(bookDTO.getPublisher());
		newBookEntity.setPublicationDate(bookDTO.getPublicationDate());
		newBookEntity.setDescription(bookDTO.getDescription());
		newBookEntity.setEdition(bookDTO.getEdition());
		newBookEntity.setLanguage(bookDTO.getLanguage());
		newBookEntity.setCoverImageUrl(bookDTO.getCoverImageUrl());
		newBookEntity.setPrice(bookDTO.getPrice());
		newBookEntity.setStockQuantity(bookDTO.getStockQuantity());
		newBookEntity.setFormat(bookDTO.getFormat());
		newBookEntity.setIsActive(true); // default to active
		newBookEntity.setRating(0.0);
		
		if (bookDTO.getAuthorIds() != null) {
			Set<AuthorEntity> authors = new HashSet<>(
					authorDao.findAllById(bookDTO.getAuthorIds()));
			newBookEntity.setAuthors(authors);
		}
		if (bookDTO.getCategoryIds() != null) {
			Set<CategoryEntity> categories = new HashSet<>(categoryDao.findAllById(bookDTO.getCategoryIds()));
			newBookEntity.setCategories(categories);
		}
		
		newBookEntity = bookDao.save(newBookEntity);
		return modelMapper.map(newBookEntity, BookRespDTO.class);
	}

	@Override
	public BookRespDTO updateBook(Long id, @Valid AdminUpdateBookDTO updatedBookDTO) {
		BookEntity existingBook = bookDao.findById(id)
				.orElseThrow(() -> new RuntimeException("Book with id " + id + " not found"));
		
		if (updatedBookDTO.getDescription() != null) {
			existingBook.setDescription(updatedBookDTO.getDescription());
		}
		
		if (updatedBookDTO.getPrice() != null) {
			existingBook.setPrice(updatedBookDTO.getPrice());
		}
		
		if (updatedBookDTO.getStockQuantity() != null) {
			existingBook.setStockQuantity(updatedBookDTO.getStockQuantity());
		}
		

		// Update categories by IDs (if provided)
		if (updatedBookDTO.getCategoryIds() != null) {
			Set<CategoryEntity> categories = new HashSet<>(categoryDao.findAllById(updatedBookDTO.getCategoryIds()));
			existingBook.setCategories(categories);
		}

		// Update authors by IDs (if provided)
		if (updatedBookDTO.getAuthorIds() != null) {
			Set<AuthorEntity> authors = new HashSet<>(authorDao.findAllById(updatedBookDTO.getAuthorIds()));
			existingBook.setAuthors(authors);
		}
		
		BookEntity updatedBook = bookDao.save(existingBook);
		
		return modelMapper.map(updatedBook, BookRespDTO.class);
	}

	@Override
	public void softDeleteBook(Long id) {
		BookEntity bookToDelete = bookDao.findById(id)
				.orElseThrow(() -> new RuntimeException("Book with id " + id + " not found"));
		bookToDelete.setIsActive(false);
		bookDao.save(bookToDelete);
	}
}
