import React, { useEffect, useState } from 'react';
import dummyUsers from '../../data/dummyUsers';
import { useNavigate } from 'react-router-dom';
import UserDetailModal from '../../components/UserDetailModal';
import { getAllUsers, deactivateUser } from '../../services/adminUserService';
import '../../css/ManageUser.css';
import CreateUserForm from './forms/CreateUserForm';
import EditUserForm from './forms/EditUserForm';


function ManageUsers() {
  // Dummy data for users
  // const users = dummyUsers;

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [error, setError] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetching all users from backend
    getAllUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setError("Error fetching users:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  const OnClickView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const OnClickCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const OnClickEdit = (user) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  const handleEditUserSuccess = () => {
    setShowEditUser(false);
    setSelectedUser(null);
    getAllUsers().then(response => setUsers(response.data));
  };

  const OnClickDeactivate = async (user) => {
    const confirmed = window.confirm(`Are you sure you want to deactivate ${user.userName}?`);
    if (confirmed) {
      try {
        console.log('user id = ', user.id)
        await deactivateUser(user.id);
        alert(`User ${user.userName} deactivated successfully!`);
        // getAllUsers().then(response => setUsers(response.data));
      } catch (err) {
        alert('Failed to deactivate user. ', err);
      }
    }
  };

  const handleCreateUserSuccess = () => {
    setShowCreateUser(false);
    // Optionally, refresh user list
    getAllUsers().then(response => setUsers(response.data));
  };

  // Filtering logic
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      user.userName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.id.toString().includes(query);
    let matchesStatus = true;
    if (statusFilter === 'true') {
      matchesStatus = user.isActive === true;
    } else if (statusFilter === 'false') {
      matchesStatus = user.isActive === false;
    } else if (statusFilter === 'new') {
      const now = new Date();
      matchesStatus = (user.isNew === true) || (user.createdOn && (() => {
        const created = new Date(user.createdOn);
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      })());
    }
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    return matchesQuery && matchesStatus && matchesRole;
  });

  // Summary stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive  ).length;
  // Determine new users by isNew or createdOn in current month
  const now = new Date();
  const newUsers = users.filter(u => {
    if (u.isNew) return true;
    if (u.createdOn) {
      const created = new Date(u.createdOn);
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }
    return false;
  }).length;


  return (
    <div className="manage-users-bg">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>User Management</h1>
            <p>Manage users and their account status</p>
          </div>
          <button className="btn btn-dark" onClick={() => setShowCreateUser(true)}>+ Add New User</button>
        </div>
        {showCreateUser && (
          <div className="users-section" style={{ maxWidth: 600, margin: '0 auto', marginBottom: 32 }}>
            <CreateUserForm onSuccess={handleCreateUserSuccess} setUsers={setUsers} />
            <div className="d-flex justify-content-end mt-2">
              <button className="btn btn-secondary" onClick={() => setShowCreateUser(false)}>Cancel</button>
            </div>
          </div>
        )}
        {showEditUser && selectedUser && (
          <div className="users-section" style={{ maxWidth: 600, margin: '0 auto', marginBottom: 32 }}>
            <EditUserForm user={selectedUser} onSuccess={handleEditUserSuccess} onCancel={() => { setShowEditUser(false); setSelectedUser(null); }} />
          </div>
        )}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-number">{totalUsers}</div>
            <div className="summary-label">Total Members</div>
          </div>
          <div className="summary-card">
            <div className="summary-number">{activeUsers}</div>
            <div className="summary-label">Active Members</div>
          </div>
          <div className="summary-card">
            <div className="summary-number">{newUsers}</div>
            <div className="summary-label">New This Month</div>
          </div>
        </div>
        <div className="filters-section">
          <form onSubmit={e => e.preventDefault()}>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Search Members</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name, email, or user ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label>Account Status</label>
                <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="all">All Members</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                  <option value="new">New User</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Role</label>
                <select className="form-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                  <option value="all">All Roles</option>
                  {[...new Set(users.map(u => u.role))].map(role => (
                    <option key={role} value={role.toLowerCase()}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group" style={{ justifyContent: 'end' }}>
                <button className="btn btn-dark">Apply Filters</button>
              </div>
            </div>
          </form>
        </div>
        <div className="users-section">
          <div className="section-header">
            <h2>Users</h2>
            <span className="results-info">Showing {filteredUsers.length} of {users.length} members</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="users-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Info</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td><strong>{user.id}</strong></td>
                    <td className="user-info">
                      <span className="user-name">{user.userName}</span>
                      <span className="user-email">{user.email}</span>
                    </td>
                    <td>{user.role}</td>
                    <td>
                      {user.isActive && (
                        <span className="status-badge status-active">Active</span>
                      )}
                      {!user.isActive && (
                        <span className="status-badge status-blocked">Blocked</span>
                      )}
                      {(user.isNew || (user.createdOn && (() => {
                        const created = new Date(user.createdOn);
                        const now = new Date();
                        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                      })())) && (
                        <span className="status-badge status-new">New</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button className="btn btn-secondary btn-small" onClick={() => OnClickView(user)}>View</button>
                      <button className="btn btn-secondary btn-small" onClick={() => OnClickEdit(user)}>Edit</button>
                      <button className="btn btn-danger btn-small" onClick={() => OnClickDeactivate(user)}>Deactivate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination placeholder (future) */}
        {/* <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e9ecef' }}>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>Showing 1-10 of {filteredUsers.length} members</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="page-btn">Previous</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">Next</button>
          </div>
        </div> */}

        <UserDetailModal
          user={selectedUser}
          show={showModal}
          handleClose={OnClickCloseModal}
          onEdit={OnClickEdit}
          onDeactivate={OnClickDeactivate}
        />
      </div>
    </div>
  );
}

export default ManageUsers;