package com.bookstore.bookstore_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.dao.AuthorDao;
import com.bookstore.bookstore_backend.dto.AuthorDTO;
import com.bookstore.bookstore_backend.entities.AuthorEntity;

@Service
public class AuthorServiceImpl implements AuthorService {
	@Autowired
	private AuthorDao authorDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<AuthorDTO> searchAuthorsByName(String name) {
		List<AuthorEntity> entities = authorDao.findByAuthorContainingIgnoreCase(name);
		return entities.stream().map(author -> modelMapper.map(author, AuthorDTO.class)).collect(Collectors.toList());
	}
}
