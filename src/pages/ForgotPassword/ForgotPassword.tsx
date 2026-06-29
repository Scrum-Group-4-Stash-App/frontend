import React, { useState } from "react";
import "./ForgotPassword.css";

import stashLogo from "@/assets/stash-logo.png";
import { AppRoutes } from "@/constants/routes";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import BackLink from "../../components/BackLink";
import Button from "../../components/Button";
import Input from "../../components/Inputs";
import SuccessAlert from "../../components/SuccessAlert";

const ForgotPassword = () => {
  const { forgotPassword, isSubmitting } = useForgotPassword();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      const response = await forgotPassword({ email });
      setSuccessMessage(
        response.message ||
          "If this email is registered, a reset link has been sent.",
      );
    } catch {
      // Notification handled in useForgotPassword.
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <BackLink label="Reset Password" href={AppRoutes.login} />

        {successMessage && (
          <SuccessAlert
            message={`${successMessage} Please check your inbox and follow the instructions.`}
          />
        )}

        <p className="forgot-password-description">
          To reset your password, submit your registered email address below. We
          will send an email with instructions on how to get access again.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={FaEnvelope}
          />

          <Button type="submit" icon={FaLock} disabled={isSubmitting}>
            {isSubmitting ? "Sending reset email..." : "Reset Password"}
          </Button>
        </form>

        <img className="forgot-password-logo" src={stashLogo} alt="STASH" />
      </div>
    </div>
  );
};

export default ForgotPassword;
