import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_API_URL;

const axiosInstance = (token?: string | undefined) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default axiosInstance;
