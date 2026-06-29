import React, { useState } from "react";
import "./ForgotPassword.css";

import stashLogo from "@/assets/stash-logo.png";
import { AppRoutes } from "@/constants/routes";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import BackLink from "../../components/BackLink";
import Button from "../../components/Button";
import Input from "../../components/Inputs";
import SuccessAlert from "../../components/SuccessAlert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Reset password for:", email);

    // API call will go here later
    setShowSuccess(true);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <BackLink label="Reset Password" href={AppRoutes.login} />

        {showSuccess && (
          <SuccessAlert
            message="The reset password instruction has been sent to your registered email.
         Please check your inbox and follow the instructions."
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

          <Button type="submit" icon={FaLock}>
            Reset Password
          </Button>
        </form>

        <img className="forgot-password-logo" src={stashLogo} alt="STASH" />
      </div>
    </div>
  );
};

export default ForgotPassword;
