package com.bookstore.bookstore_backend.service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bookstore.bookstore_backend.custom_exceptions.ResourceNotFoundException;
import com.bookstore.bookstore_backend.dao.AddressDao;
import com.bookstore.bookstore_backend.dao.BookDao;
import com.bookstore.bookstore_backend.dao.OrderDao;
import com.bookstore.bookstore_backend.dao.PaymentDao;
import com.bookstore.bookstore_backend.dao.UserDao;
import com.bookstore.bookstore_backend.dto.AdminOrderRespDTO;
import com.bookstore.bookstore_backend.dto.OrderDTO;
import com.bookstore.bookstore_backend.dto.OrderRequestDTO;
import com.bookstore.bookstore_backend.entities.OrderEntity;
import com.bookstore.bookstore_backend.entities.OrderItemEntity;
import com.bookstore.bookstore_backend.entities.OrderStatus;
import com.bookstore.bookstore_backend.entities.PaymentDetailsEntity;
import com.bookstore.bookstore_backend.entities.UserEntity;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
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

	/*
	 * * Create a new order * @param dto - OrderRequestDTO containing order details
	 * * @return OrderDTO containing created order details * This method creates a
	 * new order based on the provided OrderRequestDTO.
	 */
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
		if (order.isPresent()) {
			return order.get().getOrderStatus().toString();
		}
		return "false";
	}

	// do not delete, only soft delete(mark as delete)
	@Override
	public void deleteOrder(Long id) {
		orderDao.deleteById(id);
	}

	@Override
	public List<OrderDTO> getAllOrderswithStatus(String status) {
		List<OrderEntity> orders = orderDao.findByOrderStatus(status);

		return orders.stream().map(order -> modelMapper.map(order, OrderDTO.class)).toList();
	}

	@Override
	public OrderDTO createOrder(OrderDTO orderDTO) {
		OrderEntity order = modelMapper.map(orderDTO, OrderEntity.class);
		OrderEntity savedOrder = orderDao.save(order);
		return orderDTO;
	}

	// Admin methods for managing orders

	// * Fetch all orders for admin with optional filters
	// * @param status - Optional filter for order status
	// * @param user - Optional filter for user
	// * @param dateFrom - Optional filter for start date
	// * @param dateTo - Optional filter for end date
	// * @param pageable - Pagination information
	// * @return Page of AdminOrderRespDTO containing order details
	// Example implementation: filter by status, user, date range
	// You may need to adjust this based on your DAO/repository methods
	
	@Override
	public Page<AdminOrderRespDTO> getAllOrdersForAdmin(Pageable pageable) {
		// Just fetch all active orders in paginated form, no filters
		Page<OrderEntity> orders = orderDao.findAll(pageable);
		return orders.map(this::mapToAdminOrderRespDTO);
	}

	@Override
	public Page<AdminOrderRespDTO> getOrdersByStatus(OrderStatus status, Pageable pageable) {
		Page<OrderEntity> orders = orderDao.findByOrderStatus(status, pageable);
		return orders.map(this::mapToAdminOrderRespDTO);
	}

	// * @param orderId - ID of the order to update
	// * @param status - New status to set for the order
	// * @return AdminOrderRespDTO containing updated order details
	@Override
	public AdminOrderRespDTO updateOrderStatus(Long orderId, String status) {
		return null;
	}

	/*
	 * * Soft delete an order for admin * @param orderId - ID of the order to be
	 * deleted * This method marks an order as inactive instead of deleting it from
	 * the database.
	 */
	@Override
	public void softDeleteOrder(Long orderId) {
		OrderEntity order = orderDao.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + orderId));
		order.setIsActive(false);
		orderDao.save(order);
	}

	/*
	 * * Search orders for admin * @param query - Search term to filter orders
	 * * @return List of AdminOrderRespDTO matching the search criteria * This
	 * method allows administrators to search for orders based on a query string.
	 */
	@Override
	public List<AdminOrderRespDTO> searchOrdersForAdmin(String query) {
		return null;
	}

	// Helper methods to map OrderEntity to AdminOrderRespDTO
	private AdminOrderRespDTO mapToAdminOrderRespDTO(OrderEntity order) {

		// Calculate totalAmount from order items
		java.math.BigDecimal totalAmount = order.getOrderItems().stream()
				.map(item -> java.math.BigDecimal.valueOf(item.getPrice())
						.multiply(java.math.BigDecimal.valueOf(item.getQuantity())))
				.reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

		// Null safety for payment details
		String paymentStatus = null;
		String paymentMethod = null;
		if (order.getPaymentDetail() != null) {
			paymentStatus = order.getPaymentDetail().getPaymentStatus() != null
					? order.getPaymentDetail().getPaymentStatus()
					: null;
			// Use correct getter for payment method (adjust if field name differs)
			paymentMethod = order.getPaymentDetail().getMethod() != null ? order.getPaymentDetail().getMethod() : null;
		}

		return AdminOrderRespDTO.builder()
				.orderId(order.getId())
				.orderStatus(order.getOrderStatus().name())
				.orderPlaced(order.getOrderDate())
				.deliveryDate(order.getDeliveryDate())
				.totalAmount(totalAmount)
				.paymentStatus(paymentStatus)
				.paymentMethod(paymentMethod)
				.isActive(order.getIsActive())
				.userId(order.getUser().getId())
				.userName(order.getUser().getUserName())
				.userEmail(order.getUser().getEmail())
				.userRole(order.getUser().getRole().name())
				.addressId(order.getAddress().getId())
				.addressLine(order.getAddress().getAddressLineOne() + ", " + order.getAddress().getAddressLineTwo())
				.city(order.getAddress().getCity())
				.state(order.getAddress().getState())
				.pincode(order.getAddress().getPinCode())
				.landmark(order.getAddress().getLandMark())
				.items(order.getOrderItems().stream()
						.map(this::mapToOrderItemSummaryDTO).collect(Collectors.toList()))
				.build();
	}

	private AdminOrderRespDTO.OrderItemSummaryDTO mapToOrderItemSummaryDTO(OrderItemEntity item) {
		// Handle book reference safely
		Long bookId = null;
		String bookTitle = null;
		if (item.getBook() != null) {
			bookId = item.getBook().getId();
			bookTitle = item.getBook().getTitle();
		}
		return AdminOrderRespDTO.OrderItemSummaryDTO.builder()
				.bookId(bookId)
				.bookTitle(bookTitle)
				.quantity(item.getQuantity())
				.price(java.math.BigDecimal.valueOf(item.getPrice()))
				.build();
	}

	@Override
	public AdminOrderRespDTO getOrderDetailsForAdmin(Long orderId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public OrderDTO createOrder(OrderRequestDTO orderRequestDTO) {
		// TODO Auto-generated method stub
		return null;
	}
}
