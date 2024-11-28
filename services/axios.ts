import { getClientSideCookie, removeClientSideCookie } from "@/lib/utils";
import axios, { AxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const axiosInstance = () => {
  const token = getClientSideCookie("jwt");
  const uuid = getClientSideCookie("uuid");

  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : undefined),
      ...(uuid ? { UUID: uuid } : undefined),
    },
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          removeClientSideCookie("jwt");
          removeClientSideCookie("userInfo");

          window.location.href = "/auth/register";
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default axiosInstance;
