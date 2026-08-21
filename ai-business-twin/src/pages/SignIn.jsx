import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("userData") || "null"
    );

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      navigate("/dashboard");
      return;
    }

    setError(
      "Account not found or password is incorrect."
    );
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