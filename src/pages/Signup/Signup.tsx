import "@/App.css";
import signupVisual from "@/assets/signup-visual.jpg";
import stashLogo from "@/assets/stash-logo.png";
import AuthSocial from "@/components/AuthSocial";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import { AppRoutes } from "@/constants/routes";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { EyeOff, Lock, Mail, User } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

function SignupPage() {
  const navigate = useNavigate();
  const { register, isSubmitting } = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await register({ name, email, password });
      navigate(AppRoutes.dashboard.index, { replace: true });
    } catch {
      // Notification handled in useRegister.
    }
  }

  return (
    <main className="h-screen w-full bg-white md:bg-[#262626]">
      <section
        className="grid h-full w-full md:grid-cols-2 md:bg-white"
        aria-label="Create account"
      >
        <div className="relative hidden h-screen md:block" aria-hidden="true">
          <img
            className="h-full w-full object-cover object-center"
            src={signupVisual}
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

              <Button
                type="submit"
                className="auth-submit"
                disabled={isSubmitting}
              >
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
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
