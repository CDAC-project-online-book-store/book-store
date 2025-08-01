import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import dummyOrders from '../../data/dummyOrders';
import dummyUsers from '../../data/dummyUsers';
import dummyBooks from '../../data/dummyBooks';
import ViewOrderDetails from '../orders/ViewOrderDetails';


function ManageOrders() {
  const orders = dummyOrders;

  const [viewMode, setViewMode] = useState("list");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const OnClickView = (order) => {
    const user = dummyUsers.find(u => u.user_id === order.user_id);
    const book = dummyBooks.find(b => b.isbn === order.book_id);
    setSelectedOrder(order);
    setSelectedUser(user);
    setSelectedBook(book);
    setViewMode("details");
  }

  // search and filter funtion
  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      order.order_id.toString().includes(query) ||
      order.user_id.toString().includes(query) ||
      order.book_id.toString().includes(query);

    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const navigate = useNavigate();
  const OnClickDashboard = () => {
    navigate('/admin/dashboard');
  }


  return (
    <div className="container mt-4">
      <h2>Manage Orders</h2>
      {viewMode === "details" &&
        selectedOrder ? (<ViewOrderDetails order={selectedOrder} user={selectedUser} book={selectedBook} />) :
        (
          // search bar or filter bar
          <div className="container mt-4">
            {/* search bar */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="mb-3 flex-grow-1 p-2"  >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by order ID, user ID, or book ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* category list */}
              <div className="mb-3 p-2">
                <select className="form-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              {/* dashboard button */}
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
                  <th>User Id</th>
                  <th>Book Id</th>
                  <th>Address Id</th>
                  <th>Order Placed:</th>
                  <th>Status</th>
                  <th>Payment Id</th>
                  <th>Delivery Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.user_id}</td>
                    <td>{order.book_id}</td>
                    <td>{order.address_id}</td>
                    <td>{order.order_placed}</td>
                    <td>{order.status}</td>
                    <td>{order.payment_id}</td>
                    <td>{order.delivery_date || "---"}</td>
                    <td>
                      <button className="btn btn-sm btn-info me-2" onClick={() => OnClickView(order)}>View</button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
}

export default ManageOrders
