import React, { useState } from "react";
import "./ResetPassword.css";

import stashLogo from "@/assets/stash-logo.png";
import { AppRoutes } from "@/constants/routes";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { getPasswordLengthError } from "@/features/auth/password-validation";
import BackLink from "../../components/BackLink";
import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";

import { FaLock } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, isSubmitting } = useResetPassword();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token =
    searchParams.get("token") ||
    searchParams.get("resetToken") ||
    searchParams.get("code") ||
    "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("Reset token is missing. Please use the link in your email.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordLengthError = getPasswordLengthError(password);
    if (passwordLengthError) {
      toast.error(passwordLengthError);
      return;
    }

    try {
      await resetPassword({ token, password });
      navigate(AppRoutes.login, { replace: true });
    } catch {
      // Notification handled in useResetPassword.
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-card">
        <BackLink label="Reset Password" />

        <p className="reset-password-description">
          Please enter your new password below. Make sure it is strong and easy
          for you to remember.
        </p>

        <form onSubmit={handleSubmit}>
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" icon={FaLock} disabled={isSubmitting}>
            {isSubmitting ? "Resetting password..." : "Reset Password"}
          </Button>
        </form>

        <img className="reset-password-logo" src={stashLogo} alt="STASH" />
      </div>
    </div>
  );
};

export default ResetPassword;
