import axios, { AxiosRequestConfig } from "axios";
import { AuthStoreType } from "../types/stores/AuthStore";

const REQUEST_INTERCEPTORS = {
  auth: (config: AxiosRequestConfig) => {
    const value = localStorage.getItem("authStore");

    if (value) {
      const authStore: AuthStoreType = JSON.parse(value);
      config.headers[
        "Authorization"
      ] = `Bearer ${authStore.currentUser?.token}`;
    }
    return config;
  },
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

export const request = {
  api: () => {
    instance.interceptors.request.use(REQUEST_INTERCEPTORS.auth);
    return instance;
  },
};
