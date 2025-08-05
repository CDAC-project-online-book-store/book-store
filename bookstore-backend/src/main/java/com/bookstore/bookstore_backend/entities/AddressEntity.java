package com.bookstore.bookstore_backend.entities;

import java.util.ArrayList;
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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = { "user", "orders" })
public class AddressEntity extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;

	@Column(name = "name")
	private String name;

	@Column(name = "address_line_one")
	private String addressLineOne;

	@Column(name = "address_line_two")
	private String addressLineTwo;

	@Column(name = "landmark")
	private String landMark;

	@Column(name = "city")
	private String city;

	@Column(name = "state")
	private String state;

	@Column(name = "pincode")
	private String pinCode;

	@Column(name = "country")
	private String country = "India";

	@Enumerated(EnumType.STRING)
	@Column(name = "label", nullable = false)
	private Label label;

	@OneToMany(mappedBy = "address", cascade = CascadeType.ALL, orphanRemoval = true) // one to many relationship:
																						// address -> order
	// -> orders
	private List<OrderEntity> orders = new ArrayList<>();

	public void addOrder(OrderEntity order) {
		orders.add(order);
		order.setAddress(this);

	}

	public void removeOrder(OrderEntity order) {
		orders.remove(order);
		order.setAddress(null);
	}

}
