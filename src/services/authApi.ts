import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? ""
    : "https://stash-app-e9ambqgxgsffcpf9.canadacentral-01.azurewebsites.net");

const ACCESS_TOKEN_KEY = "stash_access_token";
const USER_KEY = "stash_user";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "super" | "admin" | "user";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  success: true;
  message: string;
  data: {
    user: AuthUser;
    accessToken: string;
  };
}

interface ApiErrorResponse {
  success?: false;
  message?: string;
  error?: {
    message?: string;
  };
  errors?: unknown;
}

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const responseMessage =
      error.response?.data?.message || error.response?.data?.error?.message;

    return responseMessage || error.message || "Something went wrong.";
  }

  return "Something went wrong.";
}

export function saveAuthSession(auth: AuthResponse["data"]) {
  localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
}

export async function loginUser(payload: { email: string; password: string }) {
  const response = await authApi.post<AuthResponse>(
    "/api/v1/auth/login",
    payload,
  );
  saveAuthSession(response.data.data);
  return response.data;
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await authApi.post<AuthResponse>(
    "/api/v1/auth/register",
    payload,
  );
  saveAuthSession(response.data.data);
  return response.data;
}
