import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const ORDER_STATUSES = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Selected Order id:', id);
    fetchOrderDetails();
    // eslint-disable-next-line
  }, [id]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/orders/${id}`);
      setOrder(response.data);
      setStatus(response.data.orderStatus);
    } catch (err) {
      setError('Failed to fetch order details');
    }
    setLoading(false);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    setUpdating(true);
    setError('');
    try {
      await api.put(`/admin/${id}/status`, { status });
      fetchOrderDetails();
    } catch (err) {
      setError('Failed to update order status');
    }
    setUpdating(false);
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;
  if (!order) return <div className="container mt-4">Order not found</div>;

  return (
    <div className="container mt-4">
      <h2>Order Details (ID: {order.orderId})</h2>
      <div className="mb-3">
        <strong>Status:</strong>
        <select value={status} onChange={handleStatusChange} className="form-select d-inline-block w-auto ms-2">
          {ORDER_STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button className="btn btn-primary ms-2" onClick={handleUpdateStatus} disabled={updating}>
          {updating ? 'Updating...' : 'Update Status'}
        </button>
      </div>
      <div className="mb-3"><strong>User:</strong> {order.userName} ({order.userEmail})</div>
      <div className="mb-3"><strong>Placed:</strong> {order.orderPlaced ? new Date(order.orderPlaced).toLocaleString() : '-'}</div>
      <div className="mb-3"><strong>Delivery Date:</strong> {order.deliveryDate ? new Date(order.deliveryDate).toLocaleString() : '-'}</div>
      <div className="mb-3"><strong>Total Amount:</strong> {order.totalAmount}</div>
      <div className="mb-3"><strong>Payment Status:</strong> {order.paymentStatus}</div>
      <div className="mb-3"><strong>Payment Method:</strong> {order.paymentMethod}</div>
      <div className="mb-3"><strong>Address:</strong> {order.addressLine}, {order.city}, {order.state}, {order.pincode}, {order.landmark}</div>
      <div className="mb-3"><strong>Order Items:</strong>
        <ul>
          {order.items && order.items.length > 0 ? order.items.map((item, idx) => (
            <li key={idx}>
              {item.bookTitle} (ID: {item.bookId}) - Qty: {item.quantity}, Price: ₹{item.price}
            </li>
          )) : <li>No items</li>}
        </ul>
      </div>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default AdminOrderDetails;
