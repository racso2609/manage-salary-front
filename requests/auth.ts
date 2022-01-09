import axios from "axios";
import { loginDataResponse, loginDataInterface } from "../interfaces/auth";
const API_URL = "http://192.168.0.107:3001";

export const loginRequest = async (
  dataRequest: loginDataInterface
): Promise<{ data?: loginDataResponse; error?: string }> => {
  try {
    const { data }: { data: loginDataResponse } = await axios.post(
      `${API_URL}/api/auth/login`,
      dataRequest
    );
    return { data };
  } catch (error) {
    const axiosErrors = axios.isAxiosError(error);
    return {
      error: axiosErrors
        ? error?.response?.data?.message || error.message
        : error,
    };
  }
};

export const currentUserRequest = async (
  token: string
): Promise<{ data?: loginDataResponse; error?: string }> => {
  try {
    const { data }: { data: loginDataResponse } = await axios.get(
      `${API_URL}/api/auth/current-user`,
      { headers: { Authorization: token } }
    );
    return { data };
  } catch (error) {
    const axiosErrors = axios.isAxiosError(error);
    return {
      error: axiosErrors
        ? error?.response?.data?.message || error.message
        : error,
    };
  }
};
