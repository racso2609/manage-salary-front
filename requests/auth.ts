import axios from "axios";
import { loginDataResponse, loginDataInterface } from "../interfaces/auth";

export const loginRequest = async (
  dataRequest: loginDataInterface
): Promise<{ data?: loginDataResponse; error?: string }> => {
  try {
    const { data }: { data: loginDataResponse } = await axios.post(
      "http://192.168.0.107:3001/api/auth/login",
      dataRequest
    );
    return { data };
  } catch (error) {
    const axiosErrors = axios.isAxiosError(error);
    return {
      error: axiosErrors
        ? error?.response?.data?.message|| error.message
        : error,
    };
  }
};
