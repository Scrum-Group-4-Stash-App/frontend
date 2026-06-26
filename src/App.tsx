import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

function App() {
  return <ForgotPassword />;
import { useState } from "react";
import { ChevronRight, EyeOff, Lock, Mail, User } from "lucide-react";
import "@/App.css";
import Button from "./components/Button";
import PasswordInput from "./components/PasswordInput";
import TextInput from "./components/TextInput";
import AuthSocial from "./components/AuthSocial";

type AuthView = "login" | "create";

function LoginPage({ onSwitch }: { onSwitch: () => void }) {
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
          forgotHref="#"
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
          <button type="button" onClick={onSwitch}>
            Create account
          </button>
        </p>
      </form>
    </main>
  );
}

function CreateAccountPage({ onSwitch }: { onSwitch: () => void }) {
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
          showRemember
          forgotHref="#"
          forgotLabel="Forget Password?"
          icon={<Lock size={16} />}
          toggleIcon={<EyeOff size={16} />}
          required
        />

        <PasswordInput
          label="Confirm password"
          placeholder="Password"
          showToggle
          showRemember
          forgotHref="#"
          forgotLabel="Forget Password?"
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
          <button type="button" onClick={onSwitch}>
            Login
          </button>
        </p>
      </form>
    </main>
  );
}

function App() {
  const [view, setView] = useState<AuthView>("login");

  return view === "login" ? (
    <LoginPage onSwitch={() => setView("create")} />
  ) : (
    <CreateAccountPage onSwitch={() => setView("login")} />
  );
}

export default App;
