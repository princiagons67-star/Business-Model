import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage(
      "If an account exists with this email, password reset instructions will be provided."
    );
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Forgot Password?</h1>

        <p>
          Enter your email address to continue.
        </p>

        <form onSubmit={submit}>

          <label>Email Address</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
          />

          {message && (
            <div className="alert alert-info">
              {message}
            </div>
          )}

          <button type="submit">
            Continue
          </button>

        </form>

        <p style={{ marginTop: 20 }}>
          <Link to="/signin">
            ← Back to Sign In
          </Link>
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;