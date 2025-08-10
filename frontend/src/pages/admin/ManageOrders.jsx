import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ViewOrderDetails from '../orders/ViewOrderDetails';

const PAGE_SIZE = 10;

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders(page);
    // eslint-disable-next-line
  }, [page]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/admin/orders');
      console.log('Fetched orders:', response.data);
      setOrders(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching orders:', error);
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

  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>
      {viewMode === "details" && selectedOrder ? (
        <ViewOrderDetails order={selectedOrder} />
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
              <button className="btn btn-secondary" onClick={OnClickDashboard}>
                Dashboard
              </button>
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
                      <button className="btn btn-sm btn-info me-2" onClick={() => OnClickView(order)}>View</button>
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
