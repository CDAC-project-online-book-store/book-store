package com.bookstore.bookstore_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.bookstore.bookstore_backend.entities.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private Long id;

    private Long userId;              // user reference (flattened)
    private Long addressId;           // address reference (flattened)
    private Long bookId;              // purchased book reference

    private List<OrderItemDTO> orderItems;

    private PaymentDetailsDTO paymentDetail;

    private LocalDateTime orderDate;
    private OrderStatus orderStatus;
    private LocalDateTime deliveryDate;
}
