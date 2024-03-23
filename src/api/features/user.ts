import axiosInstance from "@/api/axiosInstance";
import { SignupUserDetails } from "@/types";

const USER_ENDPOINT = "/user";

export const signupUser = async (userData: SignupUserDetails) => {
  const payload = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    waNumber: userData.phoneNumber,
    password: userData.password,
  };

  const { data } = await axiosInstance.post(`${USER_ENDPOINT}/signup`, payload);
  return data;
};
