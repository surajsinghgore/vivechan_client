import axiosInstance from "../axiosInstance/axiosInstance";
import toast from "react-hot-toast";

const GetAllUserApi = async () => {
  try {
    const response = await axiosInstance.get(`/v1/user/getAllUsers`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


export { GetAllUserApi };
