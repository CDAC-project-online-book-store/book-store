package com.bookstore.bookstore_backend.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class OrderEntity {
	
	
	@ManyToOne(fetch = FetchType.LAZY) // This establishes a ManyToOne relationship with UserEntity
	@JoinColumn(name = "user_id", nullable = false) // This column is a foreign key referencing the UserEntity
	private UserEntity user; // Represents the user who placed the order
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) // This establishes a OneToMany relationship with OrderItemEntity
	private List<OrderItemEntity> orderItems;// Represents the list of items in the order
	
}
