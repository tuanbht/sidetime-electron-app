import axios, { AxiosRequestConfig } from "axios";
import { ParsedDeepLinkType } from "../types/deeplink";

const REQUEST_INTERCEPTORS = {
  auth: (config: AxiosRequestConfig) => {
    const value = localStorage.getItem("deepLink");

    if (value) {
      const deepLink: ParsedDeepLinkType = JSON.parse(value);
      config.headers["Authorization"] = `Bearer ${deepLink.token}`;
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
