import { AppRoutes } from "@/constants/routes";
import { useAuthSession } from "@/features/auth/hooks/useAuthSession";
import { Navigate, Outlet, useLocation } from "react-router";

function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated } = useAuthSession();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={AppRoutes.login}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
