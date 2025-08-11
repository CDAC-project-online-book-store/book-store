import api from './api';

export const getAverageRating = (bookId) => api.get(`/api/reviews/average-rating/${bookId}`);
export const getReviewsForBook = (bookId) => api.get(`/api/reviews/book/${bookId}`);
export const getUserReview = (userId, bookId) => api.get(`/api/reviews/by-user-and-book`, { params: { userId, bookId } });
export const addReview = (data) => api.post(`/api/reviews`, data);
export const updateReview = (data) => api.put(`/api/reviews`, data);


