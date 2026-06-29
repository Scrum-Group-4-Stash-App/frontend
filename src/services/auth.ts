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

interface LogoutResponse {
  success: true;
  message: string;
}

interface RefreshTokenResponse {
  success: true;
  data: {
    accessToken: string;
  };
}

interface MessageResponse {
  success: true;
  message: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
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

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export function saveAuthSession(auth: AuthResponse["data"]) {
  localStorage.setItem(AUTH_ACCESS_TOKEN_STORAGE_KEY, auth.accessToken);
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(auth.user));
}

export function getStoredAccessToken() {
  return localStorage.getItem(AUTH_ACCESS_TOKEN_STORAGE_KEY);
}

export function setStoredAccessToken(accessToken: string) {
  localStorage.setItem(AUTH_ACCESS_TOKEN_STORAGE_KEY, accessToken);
}

export function getStoredUser(): AuthUser | null {
  const rawUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthUser;
  } catch {
    return null;
  }
}

export function getStoredSession(): AuthSession | null {
  const accessToken = getStoredAccessToken();
  const user = getStoredUser();

  if (!accessToken || !user) {
    return null;
  }

  return { user, accessToken };
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
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

export async function requestPasswordReset(payload: ForgotPasswordRequest) {
  const response = await api.post<MessageResponse>(
    "/auth/forgot-password",
    payload,
  );
  return response.data;
}

export async function resetPassword(payload: ResetPasswordRequest) {
  const response = await api.post<MessageResponse>(
    "/auth/reset-password",
    payload,
  );
  return response.data;
}

export async function refreshAccessToken() {
  const response = await api.post<RefreshTokenResponse>("/auth/refresh");
  setStoredAccessToken(response.data.data.accessToken);
  return response.data;
}

export async function logoutUser() {
  try {
    const response = await api.post<LogoutResponse>("/auth/logout");
    return response.data;
  } finally {
    clearAuthSession();
  }
}

export const login = loginUser;
export const register = registerUser;
export const logout = logoutUser;
