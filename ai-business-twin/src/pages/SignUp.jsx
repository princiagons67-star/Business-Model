import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/register");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p>
          Create your AI Business Twin account.
        </p>

        <button onClick={handleContinue}>
          Continue to Registration
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/signin">
            Sign In
          </Link>
        </p>

      </div>

    </div>
  );
}

export default SignUp;