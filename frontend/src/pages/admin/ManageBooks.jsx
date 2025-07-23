import React from 'react'

function ManageBooks() {
  return (
    <div>
      <div className="container mt-4">
      <h2>Manage Books</h2>
      <button className="btn btn-primary mb-3">Add New Book</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sample Book</td>
            <td>John Doe</td>
            <td>Fiction</td>
            <td>₹299</td>
            <td>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ManageBooks
