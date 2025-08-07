package com.bookstore.bookstore_backend.service;

import com.bookstore.bookstore_backend.dto.OrderItemDTO;

public interface OrderItemService {

	OrderItemDTO addOrderItemToOrder(Long orderId, OrderItemDTO dto);

}
