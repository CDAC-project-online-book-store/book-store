package com.bookstore.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponseDTO {
	private Long id;
	private String name;
	private String phoneNumber;
	private String pinCode;
	private String addressLineOne;
	private String addressLineTwo;
	private String landMark;
	private String city;
	private String state;
	private String label;
}
