package com.bookstore.bookstore_backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDetailsDTO {

    private Long id;
    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String paymentStatus;
    private String method;
    private BigDecimal amount;
    private String currency;
    private String email;
    private String contact;
    private boolean isVerified;
    private LocalDateTime paidAt;
}
