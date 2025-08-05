package com.bookstore.bookstore_backend.service;

import java.util.List;

import com.bookstore.bookstore_backend.dto.AuthorDTO;

public interface AuthorService {

	List<AuthorDTO> searchAuthorsByName(String name);

}
