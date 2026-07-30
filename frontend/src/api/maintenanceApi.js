import axiosClient from "./axiosClient";

export const getTickets = () => axiosClient.get("/maintenance/tickets/");
export const createTicket = (data) => axiosClient.post("/maintenance/tickets/", data);
export const updateTicket = (id, data) => axiosClient.patch(`/maintenance/tickets/${id}/`, data);
