
import React, { useState } from 'react';
import dummyUsers from '../../data/dummyUsers';
import { useNavigate } from 'react-router-dom';
import UserDetailModal from '../../components/UserDetailModal';

function ManageUsers() {
  // Dummy data for users
  const users = dummyUsers;

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const OnClickView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const OnClickCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const OnClickEdit = (user) => {
    alert(`Editing user: ${user.name}`);
  };

  const OnClickDeactivate = (user) => {
    const confirmed = window.confirm(`Are you sure you want to deactivate ${user.name}?`);
    if (confirmed) {
      alert(`User ${user.name} deactivated successfully!`);
    }
  };

  // Filtering logic
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.user_id.toString().includes(query);
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    return matchesQuery && matchesStatus && matchesRole;
  });

  // Summary stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status.toLowerCase() === 'active').length;
  const newUsers = users.filter(u => u.isNew).length;
  const overdueUsers = users.filter(u => u.status.toLowerCase().includes('overdue')).length;

  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: 40 }}>
      <div className="container">
        {/* Header */}
        <div style={{ background: '#fff', borderBottom: '2px solid #e9ecef', padding: '1.5rem 0', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>Library Management System</div>
            <button className="btn btn-outline-dark" style={{ borderRadius: 5, fontWeight: 500 }} onClick={() => navigate('/admin/dashboard')}>← Back to Dashboard</button>
          </div>
        </div>

        {/* Page header */}
        <div style={{ background: '#fff', padding: '2rem', borderRadius: 10, border: '1px solid #e9ecef', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: 8 }}>User Management</h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Manage library members and their account status</p>
          </div>
          <button className="btn btn-dark" style={{ fontWeight: 500, fontSize: '1rem', borderRadius: 5 }}>+ Add New Member</button>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: 32 }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 8, border: '1px solid #e9ecef', textAlign: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: 8 }}>{totalUsers}</div>
            <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 1 }}>Total Members</div>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 8, border: '1px solid #e9ecef', textAlign: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: 8 }}>{activeUsers}</div>
            <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 1 }}>Active Members</div>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 8, border: '1px solid #e9ecef', textAlign: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: 8 }}>{overdueUsers}</div>
            <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 1 }}>Payment Due</div>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 8, border: '1px solid #e9ecef', textAlign: 'center', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: 8 }}>{newUsers}</div>
            <div style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 1 }}>New This Month</div>
          </div>
        </div>

        {/* Filters section */}
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 10, border: '1px solid #e9ecef', boxShadow: '0 3px 10px rgba(0,0,0,0.1)', marginBottom: 32 }}>
          <form onSubmit={e => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: 8, fontWeight: 500, color: '#333' }}>Search Members</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name, email, or user ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ padding: '0.6rem', border: '2px solid #e9ecef', borderRadius: 5, fontSize: '1rem' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: 8, fontWeight: 500, color: '#333' }}>Account Status</label>
                <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '0.6rem', border: '2px solid #e9ecef', borderRadius: 5, fontSize: '1rem' }}>
                  <option value="all">All Members</option>
                  <option value="active">Active</option>
                  <option value="overdue">Payment Overdue</option>
                  <option value="new">New Members</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: 8, fontWeight: 500, color: '#333' }}>Role</label>
                <select className="form-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ padding: '0.6rem', border: '2px solid #e9ecef', borderRadius: 5, fontSize: '1rem' }}>
                  <option value="all">All Roles</option>
                  {[...new Set(users.map(u => u.role))].map(role => (
                    <option key={role} value={role.toLowerCase()}>{role}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                <button className="btn btn-dark" style={{ fontWeight: 500, fontSize: '1rem', borderRadius: 5 }}>Apply Filters</button>
              </div>
            </div>
          </form>
        </div>

        {/* Users table section */}
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e9ecef', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', marginBottom: 32 }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ color: '#333', margin: 0 }}>Library Members</h2>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>Showing {filteredUsers.length} of {users.length} members</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ minWidth: 900, marginBottom: 0 }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th>Member ID</th>
                  <th>Member Info</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.user_id}>
                    <td><strong>{user.user_id}</strong></td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 500, color: '#333', marginBottom: 2 }}>{user.name}</span>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>{user.email}</span>
                      </div>
                    </td>
                    <td>{user.role}</td>
                    <td>
                      {user.status.toLowerCase() === 'active' && (
                        <span style={{ background: '#d4edda', color: '#155724', padding: '0.3rem 0.8rem', borderRadius: 15, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase' }}>Active</span>
                      )}
                      {user.status.toLowerCase().includes('overdue') && (
                        <span style={{ background: '#f8d7da', color: '#721c24', padding: '0.3rem 0.8rem', borderRadius: 15, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase' }}>Payment Due</span>
                      )}
                      {user.isNew && (
                        <span style={{ background: '#cce5ff', color: '#004085', padding: '0.3rem 0.8rem', borderRadius: 15, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', marginLeft: 8 }}>New</span>
                      )}
                    </td>
                    <td style={{ display: 'flex', gap: 8 }}>
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