import api from "@/services/api";

export { getApiErrorMessage } from "@/services/api";
export {
  clearAuthSession,
  logout,
  logoutUser,
  login,
  loginUser,
  refreshAccessToken,
  register,
  registerUser,
  saveAuthSession,
  setStoredAccessToken,
  type AuthUser,
  type LoginRequest,
  type RegisterRequest,
} from "@/services/auth";

export const authApi = api;
