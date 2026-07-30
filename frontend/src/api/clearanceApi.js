import axiosClient from "./axiosClient";

export const getClearanceRequests = (params = {}) =>
  axiosClient.get("/clearance/requests/", { params });

export const getClearanceRequest = (id) =>
  axiosClient.get(`/clearance/requests/${id}/`);

export const initiateClearance = (employeeId, reason) =>
  axiosClient.post("/clearance/requests/", { employee_id: employeeId, reason });

export const rejectClearance = (id, notes = "") =>
  axiosClient.post(`/clearance/requests/${id}/reject/`, { notes });

export const reviewClearanceItem = (itemId, { action, condition_on_return, notes }) =>
  axiosClient.post(`/clearance/items/${itemId}/review/`, {
    action, condition_on_return, notes,
  });