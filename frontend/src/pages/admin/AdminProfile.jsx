import React from 'react';

const AdminProfile = () => {
  // Dummy admin data, replace with actual data from backend or context
  const admin = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    joined: 'January 2024',
    avatar: '/assets/icons/profile.svg',
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <div className="d-flex align-items-center mb-4">
              <img src={admin.avatar} alt="Admin Avatar" style={{ width: 80, height: 80, borderRadius: '50%', marginRight: 24 }} />
              <div>
                <h2 className="mb-1">{admin.name}</h2>
                <span className="badge bg-primary">{admin.role}</span>
              </div>
            </div>
            <div className="mb-3">
              <strong>Email:</strong> <span>{admin.email}</span>
            </div>
            <div className="mb-3">
              <strong>Joined:</strong> <span>{admin.joined}</span>
            </div>
            <div className="mt-4">
              {/* <button className="btn btn-outline-primary me-2">Edit Profile</button>
              <button className="btn btn-outline-danger">Logout</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
