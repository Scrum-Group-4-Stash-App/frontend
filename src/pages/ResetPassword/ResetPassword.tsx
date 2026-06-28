import React, { useState } from "react";
import "./ResetPassword.css";

import stashLogo from "@/assets/stash-logo.png";
import BackLink from "../../components/BackLink";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";

import { FaLock } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({
      password,
      confirmPassword,
    });

    // Backend API call will go here later
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
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" icon={FaLock}>
            Reset Password
          </Button>
        </form>

        <img className="reset-password-logo" src={stashLogo} alt="STASH" />
      </div>
    </div>
  );
};

export default ResetPassword;
