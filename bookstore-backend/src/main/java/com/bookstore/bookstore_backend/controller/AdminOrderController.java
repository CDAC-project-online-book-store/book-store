package com.bookstore.bookstore_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import com.bookstore.bookstore_backend.dto.AdminOrderRespDTO;
import com.bookstore.bookstore_backend.dto.OrderStatusUpdateDTO;
import com.bookstore.bookstore_backend.entities.OrderStatus;
import com.bookstore.bookstore_backend.service.OrderService;

import lombok.AllArgsConstructor;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Adjust the origin as needed"
@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    /*
     * 1. View all orders (paginated, with filters)
     * This endpoint allows administrators to view all orders with optional filters
     * for status, user, and date range.
     * It supports pagination for better performance and usability.
     * 
     * @param status Optional filter for order status (e.g., "PENDING",
     * "COMPLETED").
     * 
     */
    
    @Operation(description = "Get all active orders in paginated form for admin.")
    @GetMapping("/orders")
    public ResponseEntity<Page<AdminOrderRespDTO>> getAllOrders(Pageable pageable) {
        Page<AdminOrderRespDTO> orders = orderService.getAllOrdersForAdmin(pageable);
        return ResponseEntity.ok(orders);
    }

    // 2. get orders by status

    @GetMapping("/orders/status/{status}")
    @Operation(description = "Get orders by status for admin.")
    public ResponseEntity<?> getOrdersByStatus(
    		@PathVariable String status,  
    		@ParameterObject @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        // Use enum valueOf for safety
        try {
        	
        	OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            Page<AdminOrderRespDTO> orders = orderService.getOrdersByStatus(orderStatus, pageable);
            return ResponseEntity.ok(orders);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(status +": Invalid order status");
        }
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrderDetails(@PathVariable Long id) {
        AdminOrderRespDTO order = orderService.getOrderDetailsForAdmin(id);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    // 3. Update order status
    @Operation(description = "Update the status of a specific order for admin.")
    @PutMapping("/{orderId}/status")
    public ResponseEntity<AdminOrderRespDTO> updateOrderStatus(@PathVariable Long orderId,
            @RequestBody OrderStatusUpdateDTO statusUpdate) {
        AdminOrderRespDTO updatedOrder = orderService.updateOrderStatus(orderId, statusUpdate.getStatus());
        return ResponseEntity.ok(updatedOrder);
    }

    // 4. Soft delete order
    @Operation(description = "Soft delete an order for admin (mark as inactive, not removed from DB).")
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> softDeleteOrder(@PathVariable Long orderId) {
        orderService.softDeleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    // 5. Search orders
    @Operation(description = "Search orders for admin by query string.")
    @GetMapping("/search")
    public ResponseEntity<List<AdminOrderRespDTO>> searchOrders(@RequestParam String query) {
        List<AdminOrderRespDTO> results = orderService.searchOrdersForAdmin(query);
        return ResponseEntity.ok(results);
    }

    // 6. Export orders (optional)
    @Operation(description = "Export orders for admin (CSV/Excel, optional).")
    @GetMapping("/export")
    public ResponseEntity<?> exportOrders(@RequestParam(required = false) String status,
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo) {
        // Implement export logic (CSV/Excel)
        return ResponseEntity.ok().build();
    }
}
