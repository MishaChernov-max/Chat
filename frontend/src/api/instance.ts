import axios from "axios";
import { getLocalStorage } from "../libs/localStorageApi";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});
instance.interceptors.request.use(async (config) => {
  try {
    const token = getLocalStorage("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer: ${token}`;
    }
    return config;
  } catch (e) {
    throw e;
  }
});

instance.interceptors.response.use;

export default instance;
