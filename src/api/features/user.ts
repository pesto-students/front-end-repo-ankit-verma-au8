import axiosInstance from "@/api/axiosInstance";

const USER_ENDPOINT = "/categories";

interface SignupUserDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  role: string;
}

export const signupUser = async (userData: SignupUserDetails) => {
  const payload = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    waNumber: userData.phoneNumber,
    password: userData.password,
    role: userData.role,
  };

  const { data } = await axiosInstance.post(`${USER_ENDPOINT}/signup`, payload);
  return data;
};
