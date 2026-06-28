import { getStoredSession } from "@/services/auth";
import useSWR from "swr";

export const AUTH_SESSION_KEY = "auth/session";

export function useAuthSession() {
  const { data, mutate } = useSWR(AUTH_SESSION_KEY, getStoredSession, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const session = data ?? null;

  return {
    session,
    isAuthenticated: Boolean(session?.accessToken),
    mutateAuthSession: mutate,
  };
}
