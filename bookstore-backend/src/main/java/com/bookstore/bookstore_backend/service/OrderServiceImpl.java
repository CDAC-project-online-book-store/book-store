package com.bookstore.bookstore_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.custom_exceptions.ResourceNotFoundException;
import com.bookstore.bookstore_backend.dao.AddressDao;
import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dao.OrderDao;
import com.bookstore.bookstore_backend.dao.PaymentDao;
import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.dto.OrderDTO;
import com.bookstore.bookstore_backend.dto.OrderRequestDTO;
import com.bookstore.bookstore_backend.entities.AddressEntity;
import com.bookstore.bookstore_backend.entities.BookEntity;
import com.bookstore.bookstore_backend.entities.OrderEntity;
import com.bookstore.bookstore_backend.entities.OrderStatus;
import com.bookstore.bookstore_backend.entities.PaymentDetailsEntity;
import com.bookstore.bookstore_backend.entities.UserEntity;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderDao orderDao;
	private final UserDao userDao;
	private final AddressDao addressDao;
	private final PaymentDao paymentDao;
	private final BookDao bookDao;
	private final ModelMapper modelMapper;

//	@Override
//	public OrderDTO createOrder(OrderRequestDTO dto) {
//		UserEntity user = userDao.findById(dto.getUserId())
//				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//		AddressEntity address = addressDao.findById(dto.getAddressId())
//				.orElseThrow(() -> new ResourceNotFoundException("Address not found"));
//
//		PaymentDetailsEntity payment = paymentDao.findById(dto.getPaymentId())
//				.orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
//
//		OrderEntity order = new OrderEntity();
//		order.setUser(user);
//		order.setAddress(address);
//		order.setOrderDate(LocalDateTime.now());
//		order.setOrderStatus(
//				dto.getOrderStatus() != null ? OrderStatus.valueOf(dto.getOrderStatus()) : OrderStatus.PENDING);
//		order.setIsActive(true);
//
//		for (Long bookId : dto.getBookIds()) {
//			BookEntity book = bookDao.findById(bookId)
//					.orElseThrow(() -> new ResourceNotFoundException("Book not found with id " + bookId));
//
//			// Add book to order — assuming single book logic or handling with
//			// OrderItemEntity
//			order.setBook(book); // if only one book per order
//		}
//
//		// Set payment detail
//		payment.setOrder(order);
//		order.setPaymentDetail(payment);
//
//		OrderEntity savedOrder = orderDao.save(order);
//		return modelMapper.map(savedOrder, OrderDTO.class);
//	}

	@Override
	public List<OrderDTO> getAllOrders() {
		return orderDao.findAll().stream().map(orders -> modelMapper.map(orders, OrderDTO.class)).toList();
	}

	@Override
	public OrderDTO getOrderById(Long id) {
		return orderDao.findById(id).map(orders -> modelMapper.map(orders, OrderDTO.class)).orElse(null);
	}

	@Override
    public String getOrderStatus(Long id) {
    	Optional<OrderEntity> order = orderDao.findById(id);
    	if(order.isPresent()) {
    		return order.get().getOrderStatus().toString();
    	}
    	return "false";
    }

	//do not delete, only soft delete(mark as delete)
	@Override
	public void deleteOrder(Long id) {
		orderDao.deleteById(id);
	}

	 @Override
	    public List<OrderDTO> getAllOrderswithStatus(String status) {
	        List<OrderEntity> orders = orderDao.findByOrderStatus(status);

	        return orders.stream()
	                     .map(order -> modelMapper.map(order, OrderDTO.class))
	                     .toList();
	    }


	@Override
	public OrderDTO createOrder(OrderDTO orderDTO) {
		OrderEntity order = modelMapper.map(orderDTO, OrderEntity.class);
		OrderEntity savedOrder = orderDao.save(order);
		return orderDTO;
	}
}
