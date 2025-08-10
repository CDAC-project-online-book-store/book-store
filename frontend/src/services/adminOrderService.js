import api from "./api";

export const getAllOrders = () => api.get("/admin/orders");