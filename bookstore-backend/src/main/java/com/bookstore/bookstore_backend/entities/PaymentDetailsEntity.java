package com.bookstore.bookstore_backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payment_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetailsEntity extends BaseEntity {

	@Column(name = "razorpay_payment_id")
	private String razorpayPaymentId;

	@Column(name = "razorpay_order_id")
	private String razorpayOrderId;

	@Column(name = "payment_status")
	private String paymentStatus;

	@Column(name = "method")
	private String method;

	@Column(name = "amount")
	private double amount;

	@Column(name = "currency")
	private String currency;

	@Column(name = "email")
	private String email;

	@Column(name = "contact")
	private String contact;

	@Column(name = "is_verified")
	private boolean isVerified = true;
}
