package com.bookstore.bookstore_backend.dto;

import jakarta.validation.constraints.NotBlank;
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
public class AddressRequestDTO {
    @NotBlank(message = "Full name is required")
    private String name;

    @NotBlank(message = "Flat/House number is required")
    private String addressLineOne;
    
    @NotBlank(message = "Area/Street/Sector is required")
    private String addressLineTwo;
    
    private String landMark;

    @NotBlank(message = "City is required")
    private String city;
    
    @NotBlank(message = "State is required")
    private String state;
    
    @NotBlank(message = "Mobile number is required")
    private String phoneNumber;

    @NotBlank(message = "Pincode is required")
    private String pinCode;
    
    @NotNull(message = "Label is required")
    private String label;
}

