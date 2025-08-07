import api from "./api";

export const getAllUsers = () => api.get("/admin/users");

export const createUser = (userData) => api.post("/admin/users", userData);


export const updateUser = (userData) => api.put(`/admin/users/${userData.id}`, userData);

export const deactivateUser = (id) => api.put(`/admin/users/${id}/deactivate`);
   