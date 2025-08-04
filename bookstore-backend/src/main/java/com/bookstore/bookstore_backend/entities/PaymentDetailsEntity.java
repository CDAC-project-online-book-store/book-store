package com.bookstore.bookstore_backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "payment_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "order" })
public class PaymentDetailsEntity extends BaseEntity {

	@Column(name = "razorpay_payment_id")
	private String razorpayPaymentId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	private OrderEntity order;

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
