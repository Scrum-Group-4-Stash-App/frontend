import { AUTH_SESSION_KEY } from "@/features/auth/hooks/useAuthSession";
import { getApiErrorMessage } from "@/services/api";
import {
  getStoredSession,
  registerUser,
  type RegisterRequest,
} from "@/services/auth";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";

export function useRegister() {
  const { trigger, isMutating } = useSWRMutation(
    "auth/register",
    async (_key, { arg }: { arg: RegisterRequest }) => registerUser(arg),
  );

  async function register(payload: RegisterRequest) {
    try {
      const response = await trigger(payload);
      await mutate(AUTH_SESSION_KEY, getStoredSession(), false);
      toast.success(response.message || "Account created successfully.");
      return response;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  }

  return {
    register,
    isSubmitting: isMutating,
  };
}
