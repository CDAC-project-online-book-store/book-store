package com.bookstore.bookstore_backend.dto;

import java.time.LocalDateTime;

import com.bookstore.bookstore_backend.entities.OrderStatus;

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
public class OrderDTO extends BaseDTO {

	private LocalDateTime orderDate;

	private OrderStatus orderStatus;

	private LocalDateTime deliveryDate;

}
