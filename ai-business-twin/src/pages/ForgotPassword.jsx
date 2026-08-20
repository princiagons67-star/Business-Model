import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    const savedUser = localStorage.getItem("userData");

    if (!savedUser) {
      setError("No account found.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      email.toLowerCase() !==
      user.email.toLowerCase()
    ) {
      setError("No account found with this email.");
      return;
    }

    setMessage(
      "Password reset instructions would be sent to your email."
    );
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Forgot Password?</h1>

        <p>
          Enter your registered email address.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
          />

          {error && (
            <p style={{ color: "red" }}>
              {error}
            </p>
          )}

          {message && (
            <p style={{ color: "green" }}>
              {message}
            </p>
          )}

          <button type="submit">
            Reset Password
          </button>

        </form>

        <p>
          <Link to="/signin">
            Back to Sign In
          </Link>
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;