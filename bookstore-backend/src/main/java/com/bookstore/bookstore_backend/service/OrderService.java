package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.OrderDTO;
import com.bookstore.bookstore_backend.dto.OrderRequestDTO;

public interface OrderService {

	OrderDTO createOrder(OrderRequestDTO orderRequestDTO);
}
