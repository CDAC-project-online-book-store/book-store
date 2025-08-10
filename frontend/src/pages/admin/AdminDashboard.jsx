import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import AdminBar from '../../components/navbar/AdminBar';
import AdminAnalyticsService from '../../services/AdminAnalyticsService';

const AdminDashboard = () => {
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
const [orderSummary, setOrderSummary] = useState({});
const [inventorySummary, setInventorySummary] = useState({});
const [userSummary, setUserSummary] = useState({});
const [revenueSummary, setRevenueSummary] = useState({});

useEffect(() => {
  AdminAnalyticsService.getOrderSummary().then(data => setOrderSummary(data));
  AdminAnalyticsService.getInventorySummary().then(data => setInventorySummary(data));
  AdminAnalyticsService.getUserSummary().then(data => setUserSummary(data));
  AdminAnalyticsService.getRevenueSummary().then(data => setRevenueSummary(data));
}, []);


  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: 40 }}>
      {/* <AdminBar user="Anurag" /> */}

      <main className="main-content" style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="welcome-section" style={{ background: '#fff', padding: '2rem', borderRadius: 8, border: '1px solid #e9ecef', marginBottom: '2rem', boxShadow: '0 3px 10px rgba(0,0,0,0.07)' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#333' }}>Welcome Back, Admin!</h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Here's your admin overview for today, {today}</p>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <Link to="/admin/books" className="dashboard-card text-decoration-none">
                <div className="card h-100 shadow-sm stat-card text-center">
                  <div className="card-body">
                    <div style={{ fontSize: '2.2rem' }}>📚</div>
                    <h5 className="card-title mt-2">Manage Books</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/users" className="dashboard-card text-decoration-none">
                <div className="card h-100 shadow-sm stat-card text-center">
                  <div className="card-body">
                    <div style={{ fontSize: '2.2rem' }}>👤</div>
                    <h5 className="card-title mt-2">Manage Users</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/orders" className="dashboard-card text-decoration-none">
                <div className="card h-100 shadow-sm stat-card text-center">
                  <div className="card-body">
                    <div style={{ fontSize: '2.2rem' }}>📃</div>
                    <h5 className="card-title mt-2">Manage Orders</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/analytics" className="dashboard-card text-decoration-none">
                <div className="card h-100 shadow-sm stat-card text-center">
                  <div className="card-body">
                    <div style={{ fontSize: '2.2rem' }}>📝</div>
                    <h5 className="card-title mt-2">Analytics</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/profile" className="dashboard-card text-decoration-none">
                <div className="card h-100 shadow-sm stat-card text-center">
                  <div className="card-body">
                    <div style={{ fontSize: '2.2rem' }}>🧑‍💼</div>
                    <h5 className="card-title mt-2">Profile</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-8">
              <div className="panel p-4 bg-white rounded shadow-sm mb-4">
                <h2 className="mb-3" style={{ color: '#333', borderBottom: '1px solid #e9ecef', paddingBottom: '0.5rem' }}>Quick Actions</h2>
                <div className="quick-actions d-flex flex-wrap gap-3">
                  <Link to="/admin/books/add" className="btn btn-dark">Add New Book</Link>
                  <Link to="/admin/users/add" className="btn btn-dark">Add User</Link>
                  <Link to="/admin/orders" className="btn btn-outline-dark">View Orders</Link>
                  <Link to="/admin/analytics" className="btn btn-outline-dark">View Analytics</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="panel p-4 bg-white rounded shadow-sm mb-4">
                <h2 className="mb-3" style={{ color: '#333', borderBottom: '1px solid #e9ecef', paddingBottom: '0.5rem' }}>Quick Stats</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e9ecef' }}>
                      <span>Total Books:</span>
                      <strong>{inventorySummary.totalBooksInStock ?? '-'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e9ecef' }}>
                      <span>Total Users:</span>
                      <strong>{userSummary.totalUsers ?? '-'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e9ecef' }}>
                      <span>Orders Today:</span>
                      <strong>{orderSummary.totalOrdersToday ?? '-'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                      <span>Revenue (Month):</span>
                      <strong>₹{revenueSummary.totalRevenueMonth ?? '-'}</strong>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
