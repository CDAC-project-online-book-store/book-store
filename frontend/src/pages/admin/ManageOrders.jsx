import React from 'react'

function ManageOrders() {
  return (
    <div className="container mt-4">
      <h2>Order Management</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1001</td>
            <td>anurag@example.com</td>
            <td>23 Jul 2025</td>
            <td>Pending</td>
            <td>
              <button className="btn btn-sm btn-info me-2">View</button>
              <button className="btn btn-sm btn-success">Update Status</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ManageOrders
