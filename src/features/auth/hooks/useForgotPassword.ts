import { getApiErrorMessage } from "@/services/api";
import {
  requestPasswordReset,
  type ForgotPasswordRequest,
} from "@/services/auth";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export function useForgotPassword() {
  const { trigger, isMutating } = useSWRMutation(
    "auth/forgot-password",
    async (_key, { arg }: { arg: ForgotPasswordRequest }) =>
      requestPasswordReset(arg),
  );

  async function forgotPassword(payload: ForgotPasswordRequest) {
    try {
      const response = await trigger(payload);
      toast.success(
        response.message ||
          "If this email is registered, a reset link has been sent.",
      );
      return response;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  }

  return {
    forgotPassword,
    isSubmitting: isMutating,
  };
}
