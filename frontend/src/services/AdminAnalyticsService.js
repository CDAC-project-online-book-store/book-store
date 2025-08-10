import api from "./api";

const AdminAnalyticsService = {
  getOrderSummary: () => api.get('/admin/analytics/orders/summary').then(res => res.data),
  getTopSellingBooks: () => api.get('/admin/analytics/orders/top-books').then(res => res.data),
  getInventorySummary: () => api.get('/admin/analytics/inventory/summary').then(res => res.data),
  getUserSummary: () => api.get('/admin/analytics/users/summary').then(res => res.data),
  getRevenueSummary: () => api.get('/admin/analytics/revenue/summary').then(res => res.data),
};

export default AdminAnalyticsService;
