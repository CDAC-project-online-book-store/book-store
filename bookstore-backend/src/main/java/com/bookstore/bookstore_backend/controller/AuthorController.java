package com.bookstore.bookstore_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.bookstore_backend.dto.AuthorDTO;
import com.bookstore.bookstore_backend.service.AuthorService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/authors")
@AllArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping("/search")
    @Operation(description = "Search author by its name")
    public List<AuthorDTO> searchAuthors(@RequestParam("name") String name) {
        return authorService.searchAuthorsByName(name);
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<AuthorDTO> addAuthor(@PathVariable Long bookId, @RequestBody AuthorDTO dto) {
        AuthorDTO createdAuthor = authorService.addAuthorToBook(bookId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAuthor);
    }
}
