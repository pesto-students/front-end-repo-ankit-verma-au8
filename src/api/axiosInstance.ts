import axios from "axios";
import { getCookie } from "@/utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const { default: store } = await import("@/store");

  const authToken = store.getState().auth.authToken;
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  } else if (getCookie("auth")) {
    let cookieAuthToken = getCookie("auth");
    config.headers.Authorization = `Bearer ${cookieAuthToken}`;
  }
  return config;
});

export default axiosInstance;
