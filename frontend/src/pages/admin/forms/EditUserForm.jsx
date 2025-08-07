import React, { useState, useEffect } from 'react';
import { updateUser } from '../../../services/adminUserService';
import '../../../css/ManageUser.css';

function EditUserForm({ user, onSuccess, onCancel }) {
  const [form, setForm] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setForm({ ...user });
  }, [user]);

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
      await updateUser(form);
      setSuccess('User updated successfully!');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to update user.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="users-section" style={{ maxWidth: 500, margin: '0 auto' }}>
      <div className="card shadow-sm p-4 mb-4 bg-white rounded">
        <div className="section-header mb-3">
          <h2 style={{ fontWeight: 600, fontSize: '1.5rem', marginBottom: 0 }}>Edit User</h2>
          <p style={{ color: '#666', fontSize: '0.95rem', marginTop: 4 }}>Update user details below.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">User Name</label>
              <input
                type="text"
                name="userName"
                className="form-control"
                value={form.userName || ''}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email || ''}
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
                value={form.phoneNumber || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={form.role || ''}
                onChange={handleChange}
              >
                <option value="ADMIN">Admin</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>
            {/* isActive checkbox removed for admin-only control */}
            <div className="col-12 mt-3">
              <button className="btn btn-dark w-100" type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update User'}
              </button>
            </div>
            <div className="col-12 mt-2 d-flex justify-content-end">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
            {error && <div className="col-12 text-danger mt-2">{error}</div>}
            {success && <div className="col-12 text-success mt-2">{success}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
