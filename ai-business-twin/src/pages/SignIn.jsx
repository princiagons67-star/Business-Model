import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      // Save logged-in user
      localStorage.setItem(
        "userData",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Cannot connect to the backend. Make sure the backend is running."
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div
          style={{
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          <div
            className="brand-icon"
            style={{
              margin: "0 auto 12px",
            }}
          >
            AI
          </div>

          <h1>Welcome Back</h1>

          <p>
            Sign in to your AI Business Twin.
          </p>
        </div>

        <form onSubmit={submit}>

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
          />

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <button type="submit">
            Sign In
          </button>

        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          <Link to="/forgot-password">
            Forgot password?
          </Link>

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Create one
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}

export default SignIn;