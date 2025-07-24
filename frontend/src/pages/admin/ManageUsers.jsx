import React from 'react'
import dummyUsers from '../../data/dummyUsers'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetailModal from '../../components/UserDetailModal';

function ManageUsers() {
  // Dummy data for users
  const users = dummyUsers;

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const OnClickView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  }

  const OnClickCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  }

  const OnClickEdit = (user) => {
    // Logic to edit user goes here
    alert(`Editing user: ${user.name}`);
  }

  const OnClickDeactivate = (user) => {
    const confirmed = window.confirm(`Are you sure you want to deactivate ${user.name}?`);
    if (confirmed) {
      // Logic to deactivate user goes here
      alert(`User ${user.name} deactivated successfully!`);
    }
  }

  // Function to filter users based on search query
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.user_id.toString().includes(query)
    );
  });

  const navigate = useNavigate();
  const OnClickDashboard = () => {
    navigate('/admin');
  }

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      {/* search bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="mb-3 flex-grow-1 p-2"  >
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or user ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-secondary" onClick={OnClickDashboard}>
          Dashboard
          </button>
        </div>
      </div>
      {/* User table */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => OnClickView(user)}>view</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserDetailModal
        user={selectedUser}
        show={showModal}
        handleClose={OnClickCloseModal}
        onEdit={OnClickEdit}
        onDeactivate={OnClickDeactivate}
      />
    </div>
  )
}

export default ManageUsers