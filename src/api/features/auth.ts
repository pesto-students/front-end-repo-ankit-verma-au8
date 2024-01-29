import axiosInstance from "@/api/axiosInstance";

const AUTH_ENDPOINT = "/auth";

export const loginUser = async () => {
  const { data } = await axiosInstance.get(`${AUTH_ENDPOINT}/login`);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.get(`${AUTH_ENDPOINT}/logout`);
  return data;
};
