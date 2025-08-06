import api from './api';

export const getBooks = () => api.get('/book');
export const getBookById = (id) => api.get(`/book/${id}`);
export const getBookByIsbn = (isbn) => api.get(`/book/isbn/${isbn}`);
export const createBook = (data) => api.post('/book', data);
export const updateBook = (id, data) => api.put(`/book/${id}`, data);
export const deleteBook = (id) => api.delete(`/book/${id}`);
