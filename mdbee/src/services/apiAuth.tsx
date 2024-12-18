import axios from "axios";
import { getLocalRefreshToken, updateLocalAccessToken } from "./token.service";
import { API_URL } from "./common.service";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const instanceForRefresh = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user?.access;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    // Access Token was expired
    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const response = await instanceForRefresh.post("api/token/refresh/", {
          refresh: getLocalRefreshToken(),
        });

        updateLocalAccessToken(response.data.data.access);

        return instance(originalConfig);
      } catch (_error) {
        window.location.href = "/login";
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
