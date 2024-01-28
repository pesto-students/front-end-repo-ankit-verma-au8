import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_WHATSPEND_BACKEND_BASE_URL,
  headers: {
    // Authorization: `Bearer ${user?.token}`,
    "Content-Type": "application/json",
  },
});
