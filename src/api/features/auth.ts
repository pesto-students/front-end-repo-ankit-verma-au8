import axiosInstance from "@/api/axiosInstance";
import { LoginUserDetails } from "@/types";

const AUTH_ENDPOINT = "/auth";

export const loginUser = async (userData: LoginUserDetails) => {
  const payload = {
    waNumber: userData.phoneNumber,
    password: userData.password,
    role: userData.role,
    staySignedIn: true,
  };

  const { data } = await axiosInstance.post(`${AUTH_ENDPOINT}/login`, payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axiosInstance.get(`${AUTH_ENDPOINT}/logout`);
  return data;
};
