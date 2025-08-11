import api from './api';

export const createOrder = (data) => api.post('/order', data);
export const getOrdersByUser = (userId) => api.get('/order/by-user', { params: { userId } });
export const updateOrderStatus = (orderId, status) => api.put(`/order/${orderId}/status`, { status });


