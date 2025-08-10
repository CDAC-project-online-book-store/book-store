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
    <div className='container py-4'>
      <h2 className='mb-4 fw-bold text-center' style={{letterSpacing:1}}>📊 Admin Analytics Dashboard</h2>
      <div className="row g-4 mb-4">
        {/* Quick Stats */}
        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-info text-center h-100">
            <div className="card-body">
              <h6 className='card-title text-info mb-2'>Books In Stock</h6>
              <div className='display-6 fw-bold'>{inventorySummary.totalBooksInStock ?? '-'}</div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-success text-center h-100">
            <div className="card-body">
              <h6 className='card-title text-success mb-2'>Total Users</h6>
              <div className='display-6 fw-bold'>{userSummary.totalUsers ?? '-'}</div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-primary text-center h-100">
            <div className="card-body">
              <h6 className='card-title text-primary mb-2'>Delivered Orders</h6>
              <div className='display-6 fw-bold'>{orderSummary.deliveredOrders ?? '-'}</div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-warning text-center h-100">
            <div className="card-body">
              <h6 className='card-title text-warning mb-2'>Pending Orders</h6>
              <div className='display-6 fw-bold'>{orderSummary.pendingOrders ?? '-'}</div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-danger text-center h-100">
            <div className="card-body">
              <h6 className='card-title text-danger mb-2'>Cancelled Orders</h6>
              <div className='display-6 fw-bold'>{orderSummary.cancelledOrders ?? '-'}</div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-6">
          <div className="card shadow-sm border-dark text-center h-100">
            <div className="card-body">
              <h6 className='card-title text-dark mb-2'>Revenue (Month)</h6>
              <div className='display-6 fw-bold'>{revenueSummary.totalRevenueMonth ?? '-'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Books */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className='card-title mb-3 text-secondary'>🏆 Top Selling Books</h5>
              <ul className='list-group list-group-flush'>
                {topBooks.length === 0 ? (
                  <li className='list-group-item text-muted'>No data available</li>
                ) : (
                  topBooks.map((book, idx) => (
                    <li key={idx} className='list-group-item d-flex justify-content-between align-items-center'>
                      <span>{book.title}</span>
                      <span className='badge bg-info text-dark'>{book.quantitySold}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Insights */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className='card-title mb-3 text-warning'>⚠️ Low Stock Books</h5>
              <ul className='list-group list-group-flush'>
                {inventorySummary.lowStockBooks && inventorySummary.lowStockBooks.length > 0 ? (
                  inventorySummary.lowStockBooks.map((book, idx) => (
                    <li key={idx} className='list-group-item d-flex justify-content-between align-items-center'>
                      <span>{book.title}</span>
                      <span className='badge bg-warning text-dark'>{book.stockQuantity}</span>
                    </li>
                  ))
                ) : (
                  <li className='list-group-item text-muted'>No low stock books</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className='card-title mb-3 text-danger'>🚫 Zero Sales Books</h5>
              <ul className='list-group list-group-flush'>
                {inventorySummary.zeroSalesBooks && inventorySummary.zeroSalesBooks.length > 0 ? (
                  inventorySummary.zeroSalesBooks.map((book, idx) => (
                    <li key={idx} className='list-group-item d-flex justify-content-between align-items-center'>
                      <span>{book.title}</span>
                      <span className='badge bg-danger text-light'>{book.stockQuantity}</span>
                    </li>
                  ))
                ) : (
                  <li className='list-group-item text-muted'>No zero sales books</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Top Buyers */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className='card-title mb-3 text-success'>💸 Top Buyers</h5>
              <ul className='list-group list-group-flush'>
                {userSummary.topBuyers && userSummary.topBuyers.length > 0 ? (
                  userSummary.topBuyers.map((buyer, idx) => (
                    <li key={idx} className='list-group-item d-flex justify-content-between align-items-center'>
                      <span>{buyer.username}</span>
                      <span className='badge bg-success text-light'>₹{buyer.totalSpent}</span>
                    </li>
                  ))
                ) : (
                  <li className='list-group-item text-muted'>No top buyers data</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics
