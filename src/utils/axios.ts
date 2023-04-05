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

    const apiUrl = config?.url || '';

    if (!apiUrl.startsWith('/api/v1')) {
      config.headers['Key-Inflection'] = 'camel'
    }

    return config;
  },
};

export const request = {
  api: () => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      // FIXME: Add Key-Inflection config when migrated all APIs
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

    });

    instance.interceptors.request.use(REQUEST_INTERCEPTORS.auth);
    return instance;
  },
};
