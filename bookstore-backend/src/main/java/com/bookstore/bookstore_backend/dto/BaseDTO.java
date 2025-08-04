package com.bookstore.bookstore_backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BaseDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;

	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime createdOn;

	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime updatedOn;
}
