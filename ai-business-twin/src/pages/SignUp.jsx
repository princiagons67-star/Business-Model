import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div
          style={{
            textAlign: "center",
          }}
        >
          <div
            className="brand-icon"
            style={{
              margin: "0 auto 15px",
            }}
          >
            AI
          </div>

          <h1>Create Account</h1>

          <p>
            Start building your intelligent business twin.
          </p>
        </div>

        <button
          className="btn btn-primary"
          style={{
            width: "100%",
            marginTop: 15,
          }}
          onClick={() => navigate("/register")}
        >
          Create Startup Account
        </button>

        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/signin">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
}

export default SignUp;