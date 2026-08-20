import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const savedUser = localStorage.getItem("userData");

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      email.toLowerCase() !== user.email.toLowerCase() ||
      password !== user.password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p>
          Sign in to your AI Business Twin account.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email / Username</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
          />

          <label>Password</label>

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() =>
                setRememberMe(!rememberMe)
              }
            />

            Remember Me
          </label>

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button type="submit">
            Sign In
          </button>

        </form>

        <p>
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p>
          New user?{" "}
          <Link to="/signup">
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default SignIn;