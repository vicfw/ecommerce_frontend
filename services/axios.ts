import { getClientSideCookie } from "@/lib/utils";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const axiosInstance = () => {
  const token = getClientSideCookie("jwt");
  const uuid = getClientSideCookie("uuid");

  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : undefined),
      ...(uuid ? { UUID: uuid } : undefined),
    },
  });
};

export default axiosInstance;
