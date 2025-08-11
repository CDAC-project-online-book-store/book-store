import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import AdminOrderDetails from '../admin/orders/AdminOrderDetails';

const PAGE_SIZE = 10;
const ORDER_STATUSES = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (statusFilter) {
      fetchOrdersByStatus(statusFilter, page);
    } else {
      fetchOrders(page);
    }
    // eslint-disable-next-line
  }, [page, statusFilter]);

  const fetchOrders = async (pageNum) => {
    setLoading(true);
    try {
      const response = await api.get('/admin/orders', {
        params: { page: pageNum, size: PAGE_SIZE }
      });
      setOrders(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const fetchOrdersByStatus = async (status, pageNum) => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/orders/status/${status}`, {
        params: { page: pageNum, size: PAGE_SIZE }
      });
      setOrders(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching filtered orders:', error);
    }
    setLoading(false);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const OnClickView = (order) => {
    setSelectedOrder(order);
    setViewMode('details');
  };

  const OnClickDashboard = () => {
    navigate('/admin/dashboard');
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(0);
  };

  const handleClearFilter = () => {
    setStatusFilter('');
    setPage(0);
  };

  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>
      {viewMode === "details" && selectedOrder ? (
        console.log('Selected Order id:', selectedOrder.orderId),
        <AdminOrderDetails orderId={selectedOrder.orderId} />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="mb-3 flex-grow-1 p-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by order ID, user name, or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mb-3 p-2">
              <select
                className="form-select"
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option value="">All Statuses</option>
                {ORDER_STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="mb-3 p-2">
              <button className="btn btn-secondary" onClick={OnClickDashboard}>
                Dashboard
              </button>
              {statusFilter && (
                <button className="btn btn-outline-danger ms-2" onClick={handleClearFilter}>
                  Clear Filter
                </button>
              )}
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Status</th>
                <th>Placed</th>
                <th>Delivery Date</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter(order => {
                  const query = searchQuery.toLowerCase();
                  return (
                    order.orderId.toString().includes(query) ||
                    (order.userName && order.userName.toLowerCase().includes(query)) ||
                    (order.orderStatus && order.orderStatus.toLowerCase().includes(query))
                  );
                })
                .map(order => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.userName} ({order.userEmail})</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.orderPlaced ? new Date(order.orderPlaced).toLocaleString() : '-'}</td>
                    <td>{order.deliveryDate ? new Date(order.deliveryDate).toLocaleString() : '-'}</td>
                    <td>{order.totalAmount}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/admin/orders/${order.orderId}`)}>View</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button onClick={handlePrev} disabled={page === 0} className="btn btn-primary">Previous</button>
            <span>Page {page + 1} of {totalPages}</span>
            <button onClick={handleNext} disabled={page >= totalPages - 1} className="btn btn-primary">Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ManageOrders;
