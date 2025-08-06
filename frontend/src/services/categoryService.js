import api from "./api";

export const getAllCategories = () => api.get("/api/categories");
export const addCategory = (category) => api.post("/api/categories", category);
export const searchCategories = (name) => api.get(`/api/categories/search?name=${encodeURIComponent(name)}`);
