import { API_BASE_URL } from "@/config/api";
import { ErrorCodes } from "@/constants/error-codes";
import axios, { type InternalAxiosRequestConfig } from "axios";

interface ApiErrorResponse {
  success?: false;
  message?: string;
  code?: string;
  error?: {
    message?: string;
  };
  errors?: unknown;
}

interface RefreshResponse {
  success: true;
  data: {
    accessToken: string;
  };
}

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const AUTH_ACCESS_TOKEN_STORAGE_KEY = "stash_access_token";
const AUTH_USER_STORAGE_KEY = "stash_user";

const api = axios.create({
  baseURL: API_BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

function getStoredAccessToken() {
  return localStorage.getItem(AUTH_ACCESS_TOKEN_STORAGE_KEY);
}

function setStoredAccessToken(accessToken: string) {
  localStorage.setItem(AUTH_ACCESS_TOKEN_STORAGE_KEY, accessToken);
}

function clearStoredSession() {
  localStorage.removeItem(AUTH_ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
}

api.interceptors.request.use((config) => {
  const accessToken = getStoredAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    const request = error.config as RetryableRequestConfig | undefined;

    if (
      status === 401 &&
      code === ErrorCodes.INVALID_EXPIRED_TOKEN &&
      request &&
      !request._retry
    ) {
      request._retry = true;

      try {
        const refreshResponse = await axios.post<RefreshResponse>(
          `${API_BASE_URL}/api/v1/auth/refresh`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const nextAccessToken = refreshResponse.data.data.accessToken;
        setStoredAccessToken(nextAccessToken);
        request.headers.Authorization = `Bearer ${nextAccessToken}`;

        return api(request);
      } catch {
        clearStoredSession();
      }
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const responseMessage =
      error.response?.data?.message || error.response?.data?.error?.message;

    return responseMessage || error.message || "Something went wrong.";
  }

  return "Something went wrong.";
}

export default api;
