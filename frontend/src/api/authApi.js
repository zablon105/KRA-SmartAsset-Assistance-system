import axiosClient from "./axiosClient";

export const loginRequest = (identifier, password) =>
  axiosClient.post("/token/", { identifier, password });

export const fetchMe = () => axiosClient.get("/me/");

export const getUsers = () => axiosClient.get("/users/");