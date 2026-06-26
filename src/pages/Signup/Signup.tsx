import "@/App.css";
import AuthSocial from "@/components/AuthSocial";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import { AppRoutes } from "@/constants/routes";
import { EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router";

function SignupPage() {
  return (
    <main className="auth-page">
      <form className="auth-form">
        <header className="auth-header">
          <h1>New User?</h1>
          <p>Enter your details to Create account</p>
        </header>

        <TextInput
          label="Name"
          placeholder="Enter your full name"
          icon={<User size={16} />}
          required
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email address"
          icon={<Mail size={16} />}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          showToggle
          icon={<Lock size={16} />}
          toggleIcon={<EyeOff size={16} />}
          required
        />

        <PasswordInput
          label="Confirm password"
          placeholder="Password"
          showToggle
          icon={<Lock size={16} />}
          toggleIcon={<EyeOff size={16} />}
          required
        />

        <Button type="submit" className="auth-submit">
          Create account
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
