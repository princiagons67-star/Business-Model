import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",

    startupName: "",
    industry: "",
    businessModel: "",
    employees: "",
    targetMarket: "",
    startupStage: "",
    businessGoals: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
  const { name, value } = event.target;

  setForm((previous) => ({
    ...previous,
    [name]: value,
  }));
};

 const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");

  if (
    !form.name ||
    !form.email ||
    !form.password ||
    !form.startupName ||
    !form.industry
  ) {
    setError("Please fill in all required fields.");
    return;
  }

  if (!form.email.includes("@")) {
    setError("Please enter a valid email address.");
    return;
  }

  if (form.password.length < 6) {
    setError(
      "Password must contain at least 6 characters."
    );
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(
        data.message || "Registration failed."
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

    // Keep startup data locally for quick UI access
    localStorage.setItem(
      "startupData",
      JSON.stringify({
        startupName: form.startupName,
        industry: form.industry,
        businessModel: form.businessModel,
        employees: form.employees,
        targetMarket: form.targetMarket,
        startupStage: form.startupStage,
        businessGoals: form.businessGoals,
      })
    );

    navigate("/dashboard");

  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    setError(
      "Cannot connect to the backend. Make sure the backend is running."
    );
  }
};
  return (
    <div className="auth-page">

      <div
        className="auth-card"
        style={{
          maxWidth: "700px",
        }}
      >

        <h1>Register Your Business</h1>

        <p>
          Tell us about yourself and your startup.
        </p>

        <form onSubmit={handleSubmit}>

          {/* =========================
              PERSONAL INFORMATION
          ========================== */}

          <h2>Personal Information</h2>

          <label>Name *</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />

          <label>Email *</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
          />

          <label>Password *</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create password"
          />

          <label>Phone</label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />

          <label>Role</label>

          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Founder / CEO / Student"
          />

          {/* =========================
              STARTUP INFORMATION
          ========================== */}

          <h2>Startup Information</h2>

          <label>Startup Name *</label>

          <input
            type="text"
            name="startupName"
            value={form.startupName}
            onChange={handleChange}
            placeholder="Startup name"
          />

          <label>Industry *</label>

          <input
            type="text"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            placeholder="Example: AI / Healthcare / Agriculture"
          />

          <label>Business Model</label>

          <select
            name="businessModel"
            value={form.businessModel}
            onChange={handleChange}
          >
            <option value="">
              Select business model
            </option>

            <option value="B2B">
              B2B
            </option>

            <option value="B2C">
              B2C
            </option>

            <option value="B2B2C">
              B2B2C
            </option>

            <option value="Subscription">
              Subscription
            </option>

            <option value="Marketplace">
              Marketplace
            </option>
          </select>

          <label>Number of Employees</label>

          <input
            type="number"
            name="employees"
            value={form.employees}
            onChange={handleChange}
            min="0"
          />

          <label>Target Market</label>

          <input
            type="text"
            name="targetMarket"
            value={form.targetMarket}
            onChange={handleChange}
            placeholder="Your target customers"
          />

          <label>Startup Stage</label>

          <select
            name="startupStage"
            value={form.startupStage}
            onChange={handleChange}
          >
            <option value="">
              Select startup stage
            </option>

            <option value="Idea">
              Idea
            </option>

            <option value="Pre-seed">
              Pre-seed
            </option>

            <option value="Seed">
              Seed
            </option>

            <option value="Growth">
              Growth
            </option>

            <option value="Established">
              Established
            </option>
          </select>

          <label>Business Goals</label>

          <textarea
            name="businessGoals"
            value={form.businessGoals}
            onChange={handleChange}
            placeholder="Describe your business goals"
            rows="5"
          />

          {/* =========================
              ERROR
          ========================== */}

          {error && (
            <p
              style={{
                color: "red",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          )}

          {/* =========================
              SUBMIT
          ========================== */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account & Start"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;