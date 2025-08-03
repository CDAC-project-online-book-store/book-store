package com.bookstore.bookstore_backend.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserEntity extends BaseEntity {

	@Column(name = "user_name", nullable = false, length = 100)
	private String userName;

	@Column(name = "email", nullable = false, unique = true, length = 256)
	private String email;

	@Column(name = "password", nullable = false, length = 255)
	private String password;

	@Column(name = "phone_number", nullable = false, unique = true, length = 10)
	private String phoneNumber;

	@Column(nullable = false)
	private Boolean isActive = true; // Default is active

	@Enumerated(EnumType.STRING)
	@Column(length = 50)
	private UserRole role = UserRole.CUSTOMER; // Default role is USER;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderEntity> orders;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ReviewEntity> reviews;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<AddressEntity> addresses;

	public void addAddress(AddressEntity address) {
		addresses.add(address);
		address.setUser(this);

	}

	public void removeAddress(AddressEntity address) {
		addresses.remove(address);
		address.setUser(null);
	}

}
