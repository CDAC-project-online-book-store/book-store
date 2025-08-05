package com.bookstore.bookstore_backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class AuthorDTO extends BaseDTO {

	private String author;
	private String bio;
	private String website;
	private String nationality;

	public AuthorDTO(String author, String bio, String website, String nationality) {
		super();
		this.author = author;
		this.bio = bio;
		this.website = website;
		this.nationality = nationality;
	}

}
