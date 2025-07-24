import React from 'react'
import { useNavigate } from 'react-router-dom';

function ViewOrderDetails({order, user, book}) {
    const navigate = useNavigate();
  return (
    <div className='p-4 border rounded bg-light shadow-sm'>
        <h4 className="mb-4 text info">Order Details</h4>

        <div className="row mb-3">
            <div className="col-md-6">
                <h5>📦 Order Info</h5>
                <p><strong>Order ID:</strong> {order.order_id}</p>
                <p><strong>Status:</strong>{order.status}</p>
                <p><strong>Order Placed:</strong> {order.order_placed}</p>
                <p><strong>Delivery Date:</strong> {order.delivery_date || "Not yet"}</p>
                <p><strong>Payment ID:</strong> {order.payment_id}</p>
                <p><strong>Address ID:</strong> {order.address_id}</p>
            </div>
        </div>

        <div className="col-md-6">
            <h5>Customer Info</h5>
            <p><strong>User ID:</strong> {user.user_id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> {user.status}</p>
        </div>
      <div className="mt-3">
        <h5>📘 Book Info</h5>
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Price:</strong> ₹{book.price}</p>
        <p><strong>Published On:</strong> {book.published_on}</p>
      </div>
      <div className="mt-4 text-end">
        <button className="btn btn-secondary" onClick={() => navigate(0)}>Back</button>
      </div>
    </div>
  )
}

export default ViewOrderDetails
