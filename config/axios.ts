import axios, { AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import NavigateService from "services/navigate";
import StorageService from "services/storage";

import { API_URL } from "./";

const request = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

const refreshRequest = axios.create({
  baseURL: API_URL,
});

request.interceptors.request.use(
  (requestConfig: any) => {
    const { token } = StorageService.getAuthData();
    // const token = Cookies.get("token");

    if (token && token !== null && token !== "") {
      if (!isExpiredToken(token)) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
        if (requestConfig.url.includes("/files/upload")) {
          requestConfig.headers["Content-Type"] = "multipart/form-data";
        }
        if (requestConfig.url.includes("/files/download")) {
          requestConfig.responseType = "blob";
        }
      } else {
        return resetTokenAndReattemptRequest(requestConfig);
      }
    }
    return requestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const { status } = error.response;
    if (error.response.data?.error === "AuthTokenRequired") {
      // If the response status is 401 (unauthorized) and it's not a retry
      originalRequest._retry = true; // Add a property to prevent infinite retry loops
      return resetTokenAndReattemptRequest(originalRequest);
    }

    if (status === 401 && !originalRequest._retry) {
      // If the response status is 401 (unauthorized) and it's not a retry
      originalRequest._retry = true; // Add a property to prevent infinite retry loops
      return resetTokenAndReattemptRequest(originalRequest);
    }

    return Promise.reject(error);
  }
);

const isExpiredToken = (token: string = "") => {
  try {
    /* in case the call succeeds at the end of timeout,
    remove the amount of timeout from our current time
    to avoid 401 from server */
    const tokenExpiration = (jwtDecode(token) as any).exp - 40;
    const currentTime = Date.now().valueOf() / 1000;

    return tokenExpiration < currentTime;
  } catch {
    return false;
  }
};

let subscribers: any[] = [];
let isAlreadyFetchingAccessToken = false;

const resetTokenAndReattemptRequest = async (
  requestConfig: AxiosRequestConfig,
  requestType: "req" | "res" = "req"
): Promise<AxiosRequestConfig> => {
  console.log("--- Refreshing AUTH TOKEN ---");
  const { refreshToken: resetToken = "" } = StorageService.getAuthData();
  try {
    if (!resetToken) {
      throw new Error("No refresh token available");
    }

    const retryOriginalRequest = new Promise<AxiosRequestConfig>(
      requestResolverBuilder(requestType)(requestConfig)
    );

    if (!isAlreadyFetchingAccessToken) {
      /* If there is no previous call to refresh the Auth token,
      make the request. Update the value to the check so that no
      other call can be made concurrently.*/
      isAlreadyFetchingAccessToken = true;
      const response = await refreshRequest.post(`/refresh_token`, {
        token: resetToken,
      });

      if (!response.data) {
        return Promise.reject(response);
      }
      const { token, refreshToken } = response.data;
      StorageService.setAuthData(token, refreshToken);
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(token);
    }

    return retryOriginalRequest;
  } catch (err) {
    // make sure we don't lock any upcoming request in case of a refresh error
    isAlreadyFetchingAccessToken = false;
    StorageService.clearUserData();
    NavigateService.navigate("/login");
    return Promise.reject("RE-AUTH");
  }
};

const requestResolverBuilder =
  (type: "req" | "res") => (requestConfig: any) => (resolve: any) => {
    /* We need to add the request retry to the queue
  since there another request that already attempt to
  refresh the token */
    addSubscriber((authToken: string) => {
      requestConfig.headers.Authorization = "Bearer " + authToken;
      resolve(type === "req" ? requestConfig : axios(requestConfig));
    });
  };

const onAccessTokenFetched = (authToken: string) => {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach((cb) => cb(authToken));
  subscribers = [];
};

const addSubscriber = (cb: (authToken: string) => void) => subscribers.push(cb);

export { request };
