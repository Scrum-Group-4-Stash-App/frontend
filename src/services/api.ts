import { API_BASE_URL } from "@/config/api";
import axios from "axios";

interface ApiErrorResponse {
  success?: false;
  message?: string;
  error?: {
    message?: string;
  };
  errors?: unknown;
}

const api = axios.create({
  baseURL: API_BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const responseMessage =
      error.response?.data?.message || error.response?.data?.error?.message;

    return responseMessage || error.message || "Something went wrong.";
  }

  return "Something went wrong.";
}

export default api;
