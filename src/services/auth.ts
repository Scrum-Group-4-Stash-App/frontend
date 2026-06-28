import api from "@/services/api";

const AUTH_ACCESS_TOKEN_STORAGE_KEY = "stash_access_token";
const AUTH_USER_STORAGE_KEY = "stash_user";

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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export function saveAuthSession(auth: AuthResponse["data"]) {
  localStorage.setItem(AUTH_ACCESS_TOKEN_STORAGE_KEY, auth.accessToken);
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(auth.user));
}

export async function loginUser(payload: LoginRequest) {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  saveAuthSession(response.data.data);
  return response.data;
}

export async function registerUser(payload: RegisterRequest) {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  saveAuthSession(response.data.data);
  return response.data;
}

export const login = loginUser;
export const register = registerUser;
