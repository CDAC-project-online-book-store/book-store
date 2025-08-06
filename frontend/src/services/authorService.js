import api from "./api";

export const getAllAuthors = () => api.get("/api/authors");
export const addAuthor = (author) => api.post("/api/authors", author);
export const searchAuthors = (name) => api.get(`/api/authors/search?name=${encodeURIComponent(name)}`);
