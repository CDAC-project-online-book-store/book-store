package com.bookstore.bookstore_backend.dto;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderRequestDTO {

	@NotNull
	private Long userId;

	@NotNull
	private Long addressId;

	@NotNull
	private Long paymentId;

	@NotNull
	private List<Long> bookIds; // if one book per order, make it just `bookId`

	private String orderStatus; // optional for initial PENDING
}
