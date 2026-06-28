import "@/App.css";
import { AppRoutes } from "@/constants/routes";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import LoginPage from "@/pages/Login/Login";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import SignupPage from "@/pages/Signup/Signup";
import { Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      {/* this wil be updated later on to either redirect to login or dashboard based on the user authentication status */}
      <Route path="/" element={<Navigate to={AppRoutes.login} replace />} />
      <Route path={AppRoutes.login} element={<LoginPage />} />
      <Route path={AppRoutes.signup} element={<SignupPage />} />
      <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path={AppRoutes.resetPassword} element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
