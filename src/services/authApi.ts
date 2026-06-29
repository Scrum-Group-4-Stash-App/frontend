import api from "@/services/api";

export { getApiErrorMessage } from "@/services/api";
export {
  clearAuthSession,
  logout,
  logoutUser,
  login,
  loginUser,
  requestPasswordReset,
  refreshAccessToken,
  register,
  registerUser,
  resetPassword,
  saveAuthSession,
  setStoredAccessToken,
  type AuthUser,
  type ForgotPasswordRequest,
  type LoginRequest,
  type RegisterRequest,
  type ResetPasswordRequest,
} from "@/services/auth";

export const authApi = api;
