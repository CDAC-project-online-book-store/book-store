import React from 'react'

function ManageUsers() {
  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anurag Kumar</td>
            <td>anurag@example.com</td>
            <td>Admin</td>
            <td>Active</td>
            <td>
              <button className="btn btn-sm btn-secondary me-2">Edit Role</button>
              <button className="btn btn-sm btn-outline-danger">Deactivate</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ManageUsers
