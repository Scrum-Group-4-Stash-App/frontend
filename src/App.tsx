import "@/App.css";
import { AppRoutes } from "@/constants/routes";
import ProtectedRoute from "@/features/auth/guards/ProtectedRoute";
import PublicRoute from "@/features/auth/guards/PublicRoute";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import LandingPage from "@/pages/Landing/LandingPage";
import LoginPage from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import SignupPage from "@/pages/Signup/Signup";
import Dashboard from "@/pages/dashboard";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<LandingPage />} />

      <Route element={<PublicRoute />}>
        <Route path={AppRoutes.login} element={<LoginPage />} />
        <Route path={AppRoutes.signup} element={<SignupPage />} />
      </Route>

      <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path={AppRoutes.resetPassword} element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path={AppRoutes.dashboard.index} element={<Dashboard />} />
        <Route
          path={AppRoutes.dashboard.allResources}
          element={<Dashboard />}
        />
        <Route path={AppRoutes.dashboard.collections} element={<Dashboard />} />
        <Route path={AppRoutes.dashboard.favorites} element={<Dashboard />} />
        <Route path={AppRoutes.dashboard.recents} element={<Dashboard />} />
        <Route path={AppRoutes.dashboard.shared} element={<Dashboard />} />
        <Route path={AppRoutes.dashboard.trash} element={<Dashboard />} />
        <Route path={AppRoutes.dashboard.tags} element={<Dashboard />} />
        <Route path={AppRoutes.dashboard.profile} element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
