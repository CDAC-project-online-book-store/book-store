package com.bookstore.bookstore_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.bookstore.bookstore_backend.entities.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
// DTO for order get order status
public class OrderDTO extends BaseDTO {


    private Long userId;              // user reference (flattened)
    private Long addressId;           // address reference (flattened)
    private Long bookId;              // purchased book reference

    private List<OrderItemDTO> orderItems;

    private PaymentDetailsDTO paymentDetail;

    private LocalDateTime orderDate;
    private OrderStatus orderStatus;
    private LocalDateTime deliveryDate;

    private Double totalAmount;
    private Double deliveryCharge;
}
