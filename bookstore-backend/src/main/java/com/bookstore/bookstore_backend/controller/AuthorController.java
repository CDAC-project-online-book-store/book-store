package com.bookstore.bookstore_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.AuthorDTO;
import com.bookstore.bookstore_backend.service.AuthorService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

	@Autowired
	private AuthorService authorService;

	@GetMapping("/search")
	@Operation(description = "Search author by its name")
	public List<AuthorDTO> searchAuthors(@RequestParam("name") String name) {
		return authorService.searchAuthorsByName(name);
	}
}
