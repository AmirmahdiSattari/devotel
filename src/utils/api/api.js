import axios from "axios";
// import { sanitizeData, validateData } from "./validators";

const BASE_URL = "/api";

// 🔹 Create Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Ensures cookies are sent (if needed)
});

// 🔹 API Service Methods
const ApiService = {
  get: async (url, params = {}) => api.get(url, { params }),
  post: async (url, data) => api.post(url, data),
  patch: async (url, data) => api.patch(url, data),
  delete: async (url) => api.delete(url),
};

export default ApiService;
