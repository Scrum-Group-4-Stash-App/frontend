import loginVisual from "@/assets/login-visual.jpg";
import logoIcon from "@/assets/logo-icon.png";
import AuthSocial from "@/components/AuthSocial";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import { AppRoutes } from "@/constants/routes";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { EyeOff, Lock, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const { login, isSubmitting } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login({ email, password });
      navigate(AppRoutes.dashboard.index, { replace: true });
    } catch {
      // Notification handled in useLogin.
    }
  }

  return (
    <main className="auth-split-page">
      <section className="auth-split" aria-label="Login">
        <div className="auth-visual" aria-hidden="true">
          <img className="auth-visual__image" src={loginVisual} alt="" />
          <div className="auth-visual__brand">
            <img src={logoIcon} alt="" />
            <span>STASH</span>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-panel__inner auth-panel__inner--login">
            <form
              className="auth-form auth-form--figma"
              onSubmit={handleSubmit}
            >
              <header className="auth-header">
                <h1>Start Organizing</h1>
                <p>Enter your details to Login</p>
              </header>

              <TextInput
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                icon={<Mail size={16} />}
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
                forgotLabel="Forgot Password?"
                icon={<Lock size={16} />}
                toggleIcon={<EyeOff size={16} />}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <Button
                type="submit"
                className="auth-submit"
                disabled={isSubmitting}
              >
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
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
