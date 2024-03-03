import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_WHATSPEND_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const { default: store } = await import("@/store");

  const authToken = store.getState().auth.authToken;
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default axiosInstance;
