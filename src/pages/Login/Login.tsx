import loginVisual from "@/assets/login-visual.jpg";
import stashLogo from "@/assets/stash-logo.png";
import AuthSocial from "@/components/AuthSocial";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import { AppRoutes } from "@/constants/routes";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { ChevronRight, EyeOff, Lock, Mail } from "lucide-react";
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
    <main className="h-screen w-full bg-white md:bg-[#262626]">
      <section
        className="grid h-full w-full md:grid-cols-2 md:bg-white"
        aria-label="Login"
      >
        <div className="relative hidden h-screen md:block" aria-hidden="true">
          <img
            className="h-full w-full object-cover object-center"
            src={loginVisual}
            alt=""
          />
          <img
            className="absolute left-1/2 top-16 w-[min(52%,290px)] -translate-x-1/2 rounded-xl bg-white/70 px-4 py-2 shadow-lg backdrop-blur-sm"
            src={stashLogo}
            alt=""
          />
        </div>

        <div className="flex h-screen justify-center overflow-y-auto">
          <div className="flex min-h-full w-full max-w-130 items-center px-6 py-8 md:px-10 md:py-12">
            <form
              className="auth-form w-full! max-w-none! gap-5"
              onSubmit={handleSubmit}
            >
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
