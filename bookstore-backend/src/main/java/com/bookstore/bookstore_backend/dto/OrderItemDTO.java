package com.bookstore.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class OrderItemDTO extends BaseDTO {

	@jakarta.validation.constraints.NotNull
	private Long bookId;

	private int quantity;

	private double price;
}
