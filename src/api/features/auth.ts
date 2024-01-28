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

export const signupUser = async (userData: SignupUserDetails) => {
  const payload = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    waNumber: userData.phoneNumber,
    password: userData.password,
    role: userData.role,
  };

  const { data } = await axiosInstance.post("/user/signup", payload);
  return data;
};
