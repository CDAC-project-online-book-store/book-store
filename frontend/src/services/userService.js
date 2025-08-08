import api from "./api";

export const signupUser = (userData) => api.post("/users/signup", userData);
export const loginUser = (loginData) => api.post("/users/login", loginData);
