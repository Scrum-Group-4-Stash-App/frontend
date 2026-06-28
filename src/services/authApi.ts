import api from "@/services/api";

export { getApiErrorMessage } from "@/services/api";
export {
  login,
  loginUser,
  register,
  registerUser,
  saveAuthSession,
  type AuthUser,
  type LoginRequest,
  type RegisterRequest,
} from "@/services/auth";

export const authApi = api;
