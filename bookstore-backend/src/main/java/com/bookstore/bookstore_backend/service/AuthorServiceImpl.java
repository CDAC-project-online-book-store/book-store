package com.bookstore.bookstore_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.custom_exceptions.ResourceNotFoundException;
import com.bookstore.bookstore_backend.dao.AuthorDao;
import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dto.AuthorDTO;
import com.bookstore.bookstore_backend.entities.AuthorEntity;
import com.bookstore.bookstore_backend.entities.BookEntity;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorDao authorDao;
    private final BookDao bookDao;
    private final ModelMapper modelMapper;

    @Override
    public List<AuthorDTO> searchAuthorsByName(String name) {
        List<AuthorEntity> entities = authorDao.findByAuthorContainingIgnoreCase(name);
        return entities.stream()
                .map(author -> modelMapper.map(author, AuthorDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AuthorDTO addAuthorToBook(Long bookId, AuthorDTO dto) {
        BookEntity bookEntity = bookDao.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid book id - authors cannot be assigned"));
        AuthorEntity authorEntity = modelMapper.map(dto, AuthorEntity.class);

        // Set both sides of the relationship
        bookEntity.addAuthor(authorEntity);

        // Save the author (or book, either works due to cascade)
        authorDao.save(authorEntity);

        return modelMapper.map(authorEntity, AuthorDTO.class);
    }
}
