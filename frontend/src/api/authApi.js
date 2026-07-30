import axiosClient from "./axiosClient";

export const loginRequest = (username, password) =>
  axiosClient.post("/token/", { username, password });

export const fetchMe = () => axiosClient.get("/me/");

export const getUsers = () => axiosClient.get("/users/");