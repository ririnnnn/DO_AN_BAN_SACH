import axios from "axios";
import { message } from "antd";
import { refreshTokenAPI } from "../services/UserService";

let authorizedAxiosInstance = axios.create();

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // disable cache
    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";
    // Do something before request is sent
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

let refreshTokenPromise = null;

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/sign-in";
    }

    if (error?.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        const refreshToken = localStorage.getItem("refresh_token");

        refreshTokenPromise = refreshTokenAPI(JSON.parse(refreshToken))
          .then((res) => {
            const accessToken = res?.accessToken;
            localStorage.setItem("access_token", JSON.stringify(accessToken));
            authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}}`;
          })
          .catch((_error) => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/sign-in";

            return Promise.reject(_error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then(() => {
        return authorizedAxiosInstance(originalRequest);
      });
    }

    if (error?.response?.status !== 410) {
      message.error(error?.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
