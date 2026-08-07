import axiosClient from "./axiosClient";

export const loginRequest = (identifier, password) =>
  axiosClient.post("/token/", { identifier, password });

export const fetchMe = () => axiosClient.get("/me/");
export const updateProfile = (data) => axiosClient.patch("/me/", data);
export const getRolePermissions = () => axiosClient.get("/users/permissions/");
export const updateRolePermission = (id, data) => axiosClient.patch(`/users/${id}/permissions/`, data);

export const getUsers = () => axiosClient.get("/users/");