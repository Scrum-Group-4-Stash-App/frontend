import "@/App.css";
import signupVisual from "@/assets/signup-visual.jpg";
import logoIcon from "@/assets/logo-icon.png";
import AuthSocial from "@/components/AuthSocial";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import { AppRoutes } from "@/constants/routes";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { getPasswordLengthError } from "@/features/auth/password-validation";
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

    const passwordLengthError = getPasswordLengthError(password);
    if (passwordLengthError) {
      toast.error(passwordLengthError);
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
    <main className="auth-split-page">
      <section className="auth-split" aria-label="Create account">
        <div className="auth-visual" aria-hidden="true">
          <img className="auth-visual__image" src={signupVisual} alt="" />
          <div className="auth-visual__brand">
            <img src={logoIcon} alt="" />
            <span>STASH</span>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-panel__inner">
            <form
              className="auth-form auth-form--figma"
              onSubmit={handleSubmit}
            >
              <header className="auth-header">
                <h1>New User?</h1>
                <p>Enter your details to Create account</p>
              </header>

              <TextInput
                label="Name"
                placeholder="This is a placeholder"
                icon={<User size={16} />}
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <TextInput
                label="Email"
                type="email"
                placeholder="This is a placeholder"
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
