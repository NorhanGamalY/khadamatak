import axios from "axios";

export const http = axios.create({
  baseURL: "https://herafie.runasp.net/",
});

http.interceptors.request.use((config) => {
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
