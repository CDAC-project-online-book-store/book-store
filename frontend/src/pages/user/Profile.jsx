import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="container mt-5 " style={{backgroundColor:"#c7f9ccff"}}>

      <div className="text-center mb-4">
        <h2 className="fw-bold text-lapis">Welcome, Ashwin</h2>
        <p className="lead text-muted">Manage your account</p>
      </div>

      <div className="row justify-content-center">

        <div className="col-md-3 mb-4">
          <Link to="/user/addresses" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-verdigris">📃Address</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mb-4">
          <Link to="/user/order-history" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-light-green">📝Order History</h5>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 mb-4">
          <Link to="/user/settings" className="dashboard-card text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-tea-green">⚙️Settings</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

