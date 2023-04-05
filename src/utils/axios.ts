import { SiteStoreType } from './../types/stores/SiteStore';
import axios, { AxiosRequestConfig } from "axios";
import { AuthStoreType } from "../types/stores/AuthStore";

const requestInterceptorConfig = (config: AxiosRequestConfig) => {
  const persistedAuth = localStorage.getItem("authStore");

  if (persistedAuth) {
    const authStore: AuthStoreType = JSON.parse(persistedAuth);
    config.headers[
      "Authorization"
    ] = `Bearer ${authStore.currentUser?.token}`;
  }

  const persistedSite = localStorage.getItem("siteStore");

  if (persistedSite) {
    const siteStore: SiteStoreType = JSON.parse(persistedSite);
    config.headers[
      "Root-Domain"
    ] = siteStore.currentSite?.rootDomain;
  }

  const apiUrl = config?.url || '';

  if (!apiUrl.startsWith('/api/v1')) {
    config.headers['Key-Inflection'] = 'camel'
  }

  return config;
};

export const request = {
  api: () => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      // FIXME: Add Key-Inflection config when migrated all APIs
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'System-Access-Key': process.env.REACT_APP_SYSTEM_ACCESS_KEY
      },

    });

    instance.interceptors.request.use(requestInterceptorConfig);
    return instance;
  },
};
