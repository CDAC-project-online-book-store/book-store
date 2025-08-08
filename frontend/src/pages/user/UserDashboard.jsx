import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="fw-bold text-primary">User Dashboard</h2>
          <p className="lead text-muted">Manage your account, addresses, orders, and support</p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 mb-4">
          <Link to="/user/profile" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Profile</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/user/addresses" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-success">Addresses</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/user/order-history" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-info">Order History</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/user/settings" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-warning">Settings</h5>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/user/contact-us" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-danger">Contact Support</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
