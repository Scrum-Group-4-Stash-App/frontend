import "@/App.css";
import { AppRoutes } from "@/constants/routes";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import LandingPage from "@/pages/Landing/LandingPage";
import LoginPage from "@/pages/Login/Login";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import SignupPage from "@/pages/Signup/Signup";
import { Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<LandingPage />} />
      <Route path={AppRoutes.login} element={<LoginPage />} />
      <Route path={AppRoutes.signup} element={<SignupPage />} />
      <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path={AppRoutes.resetPassword} element={<ResetPassword />} />
      <Route path="*" element={<Navigate to={AppRoutes.home} replace />} />
    </Routes>
  );
}

export default App;
