import axiosInstance from "../axiosInstance/axiosInstance";
import toast from "react-hot-toast";

const LoginApi = async (payload) => {
  try {
    const response = await axiosInstance.post(`/v1/user/login`, payload);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

const RegisterApi = async (payload) => {
  try {
    const response = await axiosInstance.post(`/v1/user/register`, payload);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export { LoginApi, RegisterApi };
