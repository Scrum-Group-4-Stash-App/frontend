import { AUTH_SESSION_KEY } from "@/features/auth/hooks/useAuthSession";
import { getApiErrorMessage } from "@/services/api";
import {
  getStoredSession,
  loginUser,
  type LoginRequest,
} from "@/services/auth";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";

export function useLogin() {
  const { trigger, isMutating } = useSWRMutation(
    "auth/login",
    async (_key, { arg }: { arg: LoginRequest }) => loginUser(arg),
  );

  async function login(payload: LoginRequest) {
    try {
      const response = await trigger(payload);
      await mutate(AUTH_SESSION_KEY, getStoredSession(), false);
      toast.success(response.message || "Login successful.");
      return response;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  }

  return {
    login,
    isSubmitting: isMutating,
  };
}
