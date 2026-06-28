import { AppRoutes } from "@/constants/routes";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { Navigate, Outlet } from "react-router";

function PublicRoute() {
  const { isAuthenticated } = useAuthSession();

  if (isAuthenticated) {
    return <Navigate to={AppRoutes.dashboard.index} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
