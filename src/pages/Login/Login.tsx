import AuthSocial from "@/components/AuthSocial";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import { AppRoutes } from "@/constants/routes";
import { getApiErrorMessage } from "@/services/api";
import { loginUser } from "@/services/auth";
import loginVisual from "@/assets/login-visual.jpg";
import stashLogo from "@/assets/stash-logo.png";
import { ChevronRight, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("");
    setIsSubmitting(true);

    try {
      const response = await loginUser({ email, password });
      setStatusMessage(response.message || "Login successful.");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page login-page">
      <section className="login-shell" aria-label="Login">
        <div className="login-visual" aria-hidden="true">
          <img className="login-visual__image" src={loginVisual} alt="" />
          <img className="login-visual__logo" src={stashLogo} alt="" />
        </div>

        <form className="auth-form login-form" onSubmit={handleSubmit}>
          <header className="auth-header">
            <h1>Start Organizing</h1>
            <p>Enter your details to Login</p>
          </header>

          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={16} />}
            rightIcon={<ChevronRight size={16} />}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Password"
            showToggle
            showRemember
            forgotHref={AppRoutes.forgotPassword}
            forgotLabel="Forget Password?"
            icon={<Lock size={16} />}
            toggleIcon={<EyeOff size={16} />}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {errorMessage && (
            <p className="auth-message auth-message--error">{errorMessage}</p>
          )}
          {statusMessage && (
            <p className="auth-message auth-message--success">
              {statusMessage}
            </p>
          )}

          <Button type="submit" className="auth-submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <div className="auth-divider">
            <span />
            <strong>or</strong>
            <span />
          </div>

          <AuthSocial />

          <p className="auth-switch">
            New User?{" "}
            <button type="button">
              <Link to={AppRoutes.signup}>Create account</Link>{" "}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
