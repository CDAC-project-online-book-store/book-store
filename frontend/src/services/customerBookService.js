import api from "./api";
// For customer/unregistered: fetch book by ISBN
export const getBookByIsbn = (isbn) => api.get(`/books/isbn/${isbn}`);

// Add to cart (for customer)
export const addToCart = (bookId, quantity = 1) => api.post(`/cart/add`, { bookId, quantity });

// Buy now (for customer)
export const buyNow = (bookId, quantity = 1) => api.post(`/order/buy`, { bookId, quantity });
