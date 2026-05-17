import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (config.method === "get") {
      config.params = { ...config.params, _t: Date.now() };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 400 || error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    if (error.response?.status === 403) {
      console.error("Access denied");
    }
    if (error.response?.status >= 500) {
      console.error("Server error");
    }
    return Promise.reject(error);
  }
);

export default api;
