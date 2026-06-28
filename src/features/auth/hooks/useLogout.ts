import { AppRoutes } from "@/constants/routes";
import { AUTH_SESSION_KEY } from "@/features/auth/hooks/useAuthSession";
import { getApiErrorMessage } from "@/services/api";
import { logoutUser } from "@/services/auth";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const { trigger, isMutating } = useSWRMutation("auth/logout", async () =>
    logoutUser(),
  );

  async function logout() {
    try {
      const response = await trigger();
      await mutate(AUTH_SESSION_KEY, null, false);
      toast.success(response.message || "Logged out successfully.");
    } catch (error) {
      await mutate(AUTH_SESSION_KEY, null, false);
      toast.error(getApiErrorMessage(error));
    } finally {
      navigate(AppRoutes.login, { replace: true });
    }
  }

  return {
    logout,
    isSubmitting: isMutating,
  };
}
