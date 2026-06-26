import "@/App.css";
import Button from "./components/Button";
import BackLink from "./components/BackLink";
import PasswordInput from "./components/PasswordInput";

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <BackLink label="Reset Password" onClick={() => window.history.back()} />

      <div style={{ marginTop: 16 }}>
        <Button>Reset Password</Button>
      </div>

      <div style={{ marginTop: 24, maxWidth: 420 }}>
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          showToggle
          showRemember
          forgotHref="#"
        />
      </div>
    </div>
  );
}

export default App;
