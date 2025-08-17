import api from './api';

export const getBooks = () => api.get('/book');
export const getBookById = (id) => api.get(`/book/${id}`);
export const getBookByIsbn = (isbn) => api.get(`/book/isbn/${isbn}`);
export const createBook = (data) => api.post('/book', data);
export const updateBook = (id, data) => api.put(`/book/${id}`, data);
export const deleteBook = (id) => api.delete(`/book/${id}`);

// Search books with filters
export const searchBooks = ({ title, category, author, priceMin, priceMax }) => {
	const params = {};
	if (title) params.title = title;
	if (category) params.category = category;
	if (author) params.author = author;
	if (priceMin) params.priceMin = priceMin;
	if (priceMax) params.priceMax = priceMax;
	return api.get('/book/search', { params });
};
