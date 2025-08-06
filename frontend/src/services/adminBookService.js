import api from "./api";

export const getBooks = () => api.get('/admin/books');
export const getBookById = (id) => api.get(`/admin/books/${id}`);
export const createBook = (data) => api.post('/admin/create-book', data);
export const updateBook = (id, data) => api.put(`/admin/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/admin/books/${id}`);
export const getAllBooksIncludingInactive = () => api.get('/admin/books/all');