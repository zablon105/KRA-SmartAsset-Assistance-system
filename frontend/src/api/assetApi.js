import axiosClient from "./axiosClient";

export const getAssets = (params = {}) => axiosClient.get("/assets/", { params });
export const getAsset = (id) => axiosClient.get(`/assets/${id}/`);
export const createAsset = (data) => axiosClient.post("/assets/", data);
export const updateAsset = (id, data) => axiosClient.put(`/assets/${id}/`, data);
export const deleteAsset = (id) => axiosClient.delete(`/assets/${id}/`);
export const assignAsset = (id, employeeId, notes = "") =>
  axiosClient.post(`/assets/${id}/assign/`, { employee_id: employeeId, notes });
export const transferAsset = (id, employeeId, notes = "") =>
  axiosClient.post(`/assets/${id}/transfer/`, { employee_id: employeeId, notes });
export const returnAsset = (id, notes = "") =>
  axiosClient.post(`/assets/${id}/return/`, { notes });
