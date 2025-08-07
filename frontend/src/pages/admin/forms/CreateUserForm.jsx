import React, { useState } from 'react';
import { createUser } from '../../../services/adminUserService';
import '../../../css/ManageUser.css';

const initialState = {
  userName: '',
  email: '',
  phoneNumber: '',
  password: '',
  role: 'CUSTOMER',
  isActive: true,
};

function CreateUserForm({ onSuccess }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createUser(form);
      setSuccess('User created successfully!');
      setForm(initialState);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to create user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-section" style={{ maxWidth: 500, margin: '0 auto', marginTop: 32 }}>
      <div className="card shadow-sm p-4 mb-4 bg-white rounded">
        <div className="section-header mb-3">
          <h2 style={{ fontWeight: 600, fontSize: '1.5rem', marginBottom: 0 }}>Create New User</h2>
          <p style={{ color: '#666', fontSize: '0.95rem', marginTop: 4 }}>Fill in the details to add a new user to the system.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">User Name</label>
              <input
                type="text"
                name="userName"
                className="form-control"
                value={form.userName}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="col-12">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
              >
                <option value="ADMIN">Admin</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>
            <div className="col-md-6 d-flex align-items-center" style={{ marginTop: 32 }}>
              <label className="form-label mb-0 me-2">Active</label>
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                style={{ width: 20, height: 20 }}
              />
            </div>
            <div className="col-12 mt-3">
              <button className="btn btn-dark w-100" type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create User'}
              </button>
            </div>
            {error && <div className="col-12 text-danger mt-2">{error}</div>}
            {success && <div className="col-12 text-success mt-2">{success}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserForm;
