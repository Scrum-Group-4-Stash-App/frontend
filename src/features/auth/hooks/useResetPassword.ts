import { getApiErrorMessage } from "@/services/api";
import { resetPassword, type ResetPasswordRequest } from "@/services/auth";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export function useResetPassword() {
  const { trigger, isMutating } = useSWRMutation(
    "auth/reset-password",
    async (_key, { arg }: { arg: ResetPasswordRequest }) => resetPassword(arg),
  );

  async function submitResetPassword(payload: ResetPasswordRequest) {
    try {
      const response = await trigger(payload);
      toast.success(response.message || "Password reset successful.");
      return response;
    } catch (error) {
      toast.error(getApiErrorMessage(error));
      throw error;
    }
  }

  return {
    resetPassword: submitResetPassword,
    isSubmitting: isMutating,
  };
}
