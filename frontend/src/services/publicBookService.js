import api from './api';

// For public/customer: fetch book by ISBN
export const getBookByIsbn = (isbn) => api.get(`/book/isbn/${isbn}`);
