import "@/App.css";
import AuthSocial from "@/components/AuthSocial";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import { AppRoutes } from "@/constants/routes";
import { getApiErrorMessage, registerUser } from "@/services/authApi";
import { EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerUser({ name, email, password });
      setStatusMessage(response.message || "Account created successfully.");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <header className="auth-header">
          <h1>New User?</h1>
          <p>Enter your details to Create account</p>
        </header>

        <TextInput
          label="Name"
          placeholder="Enter your full name"
          icon={<User size={16} />}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email address"
          icon={<Mail size={16} />}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          showToggle
          icon={<Lock size={16} />}
          toggleIcon={<EyeOff size={16} />}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <PasswordInput
          label="Confirm password"
          placeholder="Password"
          showToggle
          icon={<Lock size={16} />}
          toggleIcon={<EyeOff size={16} />}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />

        {errorMessage && (
          <p className="auth-message auth-message--error">{errorMessage}</p>
        )}
        {statusMessage && (
          <p className="auth-message auth-message--success">{statusMessage}</p>
        )}

        <Button type="submit" className="auth-submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <div className="auth-divider">
          <span />
          <strong>or</strong>
          <span />
        </div>

        <AuthSocial />

        <p className="auth-switch">
          Have account?{" "}
          <button type="button">
            <Link to={AppRoutes.login}>Login</Link>
          </button>
        </p>
      </form>
    </main>
  );
}

export default SignupPage;
