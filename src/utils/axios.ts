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

export const request = {
  api: () => {
    let instance = axios.create({
      baseURL: "https://mks-st2-staging.herokuapp.com",
      timeout: 5000,
    });

    instance.interceptors.request.use(REQUEST_INTERCEPTORS.auth);
    return instance;
  },
};
