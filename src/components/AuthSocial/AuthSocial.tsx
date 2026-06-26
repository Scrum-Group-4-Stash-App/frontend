import { Apple } from "lucide-react";
import "./AuthSocial.css";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.8-1.7 3-4.1 3-7z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.4c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3.1v2.5C4.7 19.7 8.1 22 12 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.6H3.1C2.4 8.9 2 10.4 2 12s.4 3.1 1.1 4.4l3.3-2.5z"
      />
      <path
        fill="#EA4335"
        d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 2.9 14.7 2 12 2 8.1 2 4.7 4.3 3.1 7.6l3.3 2.5C7.2 7.7 9.4 5.9 12 5.9z"
      />
    </svg>
  );
}

function AuthSocial() {
  return (
    <div className="auth-social">
      <button type="button" className="auth-social__button">
        <GoogleIcon />
        <span>Continue with Google</span>
      </button>
      <button type="button" className="auth-social__button">
        <Apple size={16} />
        <span>Continue with Apple</span>
      </button>
    </div>
  );
}

export default AuthSocial;
