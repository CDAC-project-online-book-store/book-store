package com.bookstore.bookstore_backend.entities;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "user", "address", "orderItems", "paymentDetail" })
public class OrderEntity extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY) // This establishes a ManyToOne relationship with UserEntity
	@JoinColumn(name = "user_id", nullable = false) // This column is a foreign key referencing the UserEntity
	private UserEntity user; // Represents the user who placed the order

	@ManyToOne(fetch = FetchType.LAZY) // many to one relationship: order -> address
	@JoinColumn(name = "address_id", nullable = false) // foreign key referencing to the address entity
	private AddressEntity address;

	//OneToMany relationship with OrderItemEntity
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) 
	private List<OrderItemEntity> orderItems;// Represents the list of items in the order

	@OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true) // one -> one relationship between
																					// order and payment_detail
	private PaymentDetailsEntity paymentDetail;

	@Column(name = "order_date")
	private LocalDateTime orderDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "order_status")
	private OrderStatus orderStatus;

	@Column(name = "delivery_date")
	private LocalDateTime deliveryDate;

}
