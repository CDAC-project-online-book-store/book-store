package com.bookstore.bookstore_backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore.bookstore_backend.custom_exceptions.ResourceNotFoundException;
import com.bookstore.bookstore_backend.dao.OrderDao;
import com.bookstore.bookstore_backend.dao.OrderItemDao;
import com.bookstore.bookstore_backend.dto.OrderItemDTO;
import com.bookstore.bookstore_backend.entities.OrderEntity;
import com.bookstore.bookstore_backend.entities.OrderItemEntity;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

	private final OrderItemDao orderItemDao;
	private final ModelMapper modelMapper;
	private final OrderDao orderDao;

	@Override
	public OrderItemDTO addOrderItemToOrder(Long orderId, OrderItemDTO dto) {
		OrderEntity orderEntity = orderDao.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid order id - order item cannot be assigned"));

		OrderItemEntity orderItemEntity = modelMapper.map(dto, OrderItemEntity.class);

		// Set the order reference
		orderItemEntity.setOrder(orderEntity);

		// Add to order's item list
		orderEntity.addOrderItem(orderItemEntity);

		// Save the order item
		OrderItemEntity savedOrderItem = orderItemDao.save(orderItemEntity);

		// Return the saved entity as DTO
		return modelMapper.map(savedOrderItem, OrderItemDTO.class);
	}
}
