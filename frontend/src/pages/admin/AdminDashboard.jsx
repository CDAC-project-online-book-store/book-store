import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-5 " style={{backgroundColor:"#c7f9ccff"}}>

      <div className="text-center mb-4">
        <h2 className="fw-bold text-lapis">Welcome, Admin</h2>
        <p className="lead text-muted">Select a module to manage:</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-3 mb-4">
          <Link to="/admin/books" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-emerald"> 📚Manage Books</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mb-4">
          <Link to="/admin/users" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-verdigris">👤 Manage Users</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mb-4">
          <Link to="/admin/orders" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-light-green">📃Manage Orders</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mb-4">
          <Link to="/admin/analytics" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-tea-green">📝Analytics</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

