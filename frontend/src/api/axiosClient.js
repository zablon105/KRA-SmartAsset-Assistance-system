import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
});

// Attach JWT access token to every outgoing request, if we have one.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle authentication errors globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401 Unauthorized response, clear auth data and redirect to login
    if (error.response?.status === 401) {
      console.warn("[Security] Unauthorized access - clearing auth and redirecting to login");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("kra_user_role");
      localStorage.removeItem("kra_user_name");
      
      // Redirect to login (if not already there)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
