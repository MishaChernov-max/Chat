import axios from "axios";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../libs/localStorageApi";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
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
  // API_CONFIG.USERS_API-http://localhost:5000/api из env
  const response = await axios.post(
    `${"http://localhost:5000/api"}/refresh`,
    {},
    {
      withCredentials: true, // Для работы с httpOnly cookies
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
        console.log("ERROR_STATUS_401");
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
