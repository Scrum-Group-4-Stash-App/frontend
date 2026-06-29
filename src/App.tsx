import "@/App.css";
import { AppRoutes } from "@/constants/routes";
// import ProtectedRoute from "@/features/auth/guards/ProtectedRoute";
import PublicRoute from "@/features/auth/guards/PublicRoute";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import LandingPage from "@/pages/Landing/LandingPage";
import LoginPage from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import SignupPage from "@/pages/Signup/Signup";
import { Route, Routes } from "react-router";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";

import ResourcesPage from "./pages/resource";
import Dashboard from "./pages/dashboard";
import CollectionsPage from "./pages/Collections";

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
      {/* <Route element={<ProtectedRoute />}> */}
      <Route element={<DashboardLayout />}>
        <Route path={AppRoutes.dashboard.index} element={<Dashboard />} />
        <Route
          path={AppRoutes.dashboard.allResources}
          element={<ResourcesPage />}
        />
        <Route
          path={AppRoutes.dashboard.collections}
          element={<CollectionsPage />}
        />
        <Route
          path={AppRoutes.dashboard.favorites}
          element={<div>Favorites</div>}
        />
        <Route
          path={AppRoutes.dashboard.recents}
          element={<div>Recents</div>}
        />
        <Route path={AppRoutes.dashboard.shared} element={<div>Shared</div>} />
        <Route path={AppRoutes.dashboard.trash} element={<div>Trash</div>} />
        <Route path={AppRoutes.dashboard.tags} element={<div>Tags</div>} />
        <Route
          path={AppRoutes.dashboard.profile}
          element={<div>Profile</div>}
        />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
