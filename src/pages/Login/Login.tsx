import AuthSocial from "@/components/AuthSocial";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import { AppRoutes } from "@/constants/routes";
import { ChevronRight, EyeOff, Lock, Mail } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  return (
    <main className="auth-page">
      <form className="auth-form">
        <header className="auth-header">
          <h1>Start Organizing</h1>
          <p>Enter your details to Login</p>
        </header>

        <TextInput
          label="Username"
          type="email"
          placeholder="Enter your username"
          icon={<Mail size={16} />}
          rightIcon={<ChevronRight size={16} />}
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
          required
        />

        <Button type="submit" className="auth-submit">
          Login
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
    </main>
  );
}

export default LoginPage;
