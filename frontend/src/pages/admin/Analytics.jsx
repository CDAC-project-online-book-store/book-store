import React, { useEffect, useState } from 'react';
import AdminAnalyticsService from '../../services/AdminAnalyticsService';


function Analytics() {
  const [orderSummary, setOrderSummary] = useState({});
  const [topBooks, setTopBooks] = useState([]);
  const [inventorySummary, setInventorySummary] = useState({});
  const [userSummary, setUserSummary] = useState({});
  const [revenueSummary, setRevenueSummary] = useState({});

  useEffect(() => {
    AdminAnalyticsService.getOrderSummary().then(data => setOrderSummary(data));
    AdminAnalyticsService.getTopSellingBooks().then(data => setTopBooks(data.topBooks || []));
    AdminAnalyticsService.getInventorySummary().then(data => setInventorySummary(data));
    AdminAnalyticsService.getUserSummary().then(data => setUserSummary(data));
    AdminAnalyticsService.getRevenueSummary().then(data => setRevenueSummary(data));
  }, []);


  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Analytics</h2>
      <div className="d-flex justify-content-between align-items-center mb-3 overflow-auto gap-3 pb-3">
        {/* Total books in stock */}
        <div>
          <div className="card shadow-sm border-info" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-info'>📚 Total Books In Stock</h5>
              <p className='card-text fs-4 fw-bold'>{inventorySummary.totalBooksInStock ?? '-'}</p>
            </div>
          </div>
        </div>
        {/* Total users */}
        <div>
          <div className="card shadow-sm border-success" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-success'>👥 Total Users</h5>
              <p className='card-text fs-4 fw-bold'>{userSummary.totalUsers ?? '-'}</p>
            </div>
          </div>
        </div>
        {/* Orders delivered */}
        <div>
          <div className="card shadow-sm border-primary" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-primary'>📦 Orders Delivered</h5>
              <p className='card-text fs-4 fw-bold'>{orderSummary.deliveredOrders ?? '-'}</p>
            </div>
          </div>
        </div>
        {/* Orders pending */}
        <div>
          <div className="card shadow-sm border-warning" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-warning'>🔁 Orders Pending</h5>
              <p className='card-text fs-4 fw-bold'>{orderSummary.pendingOrders ?? '-'}</p>
            </div>
          </div>
        </div>
        {/* Orders cancelled */}
        <div>
          <div className="card shadow-sm border-danger" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-danger'>❌ Orders Cancelled</h5>
              <p className='card-text fs-4 fw-bold'>{orderSummary.cancelledOrders ?? '-'}</p>
            </div>
          </div>
        </div>
        {/* Revenue this month */}
        <div>
          <div className="card shadow-sm border-dark" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-dark'>💰 Revenue This Month</h5>
              <p className='card-text fs-4 fw-bold'>{revenueSummary.totalRevenueMonth ?? '-'}</p>
            </div>
          </div>
        </div>
        {/* Revenue all time */}
        <div>
          <div className="card shadow-sm border-dark" style={{ minWidth: '200px' }}>
            <div className="card-body">
              <h5 className='card-title text-dark'>💰 Revenue All Time</h5>
              <p className='card-text fs-4 fw-bold'>{revenueSummary.totalRevenueAllTime ?? '-'}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Optionally, display top books, low stock, zero sales, top buyers, etc. */}
    </div>
  );
}

export default Analytics
