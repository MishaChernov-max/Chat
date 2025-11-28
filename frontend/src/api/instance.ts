import axios from "axios";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../libs/localStorageApi";

const baseurl = import.meta.env.VITE_API_CONFIG || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: baseurl,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  try {
    const token = getLocalStorage("accessToken");
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    throw error;
  }
});

export const refreshTokenApi = async (): Promise<{ data: string }> => {
  const response = await instance.post(
    `/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
  return { data: response.data.token };
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    try {
      const originalRequest = error.config;
      console.log("error", error);
      if (error?.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const accessToken = getLocalStorage("accessToken");
        if (!accessToken) {
          window.location.href = "/loginPage";
        }
        const response = await refreshTokenApi();
        const newAccessToken = response.data;
        if (newAccessToken) {
          await setLocalStorage("accessToken", newAccessToken);
          originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } else {
          clearLocalStorage("accessToken");
          window.location.href = "/loginPage";
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export default instance;
