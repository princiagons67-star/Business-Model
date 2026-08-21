import { Link } from "react-router-dom";

function FrontUI() {
  return (
    <div className="landing-page">

      <nav className="landing-nav">

        <div className="landing-logo">
          ✦ AI Business Twin
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <Link
            to="/signin"
            className="btn btn-secondary"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>

      </nav>

      <section className="landing-hero">

        <span className="badge badge-green">
          AI • Business • Sustainability
        </span>

        <h1 style={{ marginTop: 20 }}>
          Build a smarter
          <br />
          <span>business future.</span>
        </h1>

        <p>
          AI Business Twin helps startups understand
          performance, optimise budgets, improve ESG
          performance and explore business scenarios.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 25,
          }}
        >
          <Link
            to="/register"
            className="btn btn-primary"
          >
            Create Your Business Twin →
          </Link>

          <Link
            to="/signin"
            className="btn btn-secondary"
          >
            Sign In
          </Link>
        </div>

      </section>

      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "20px 30px 80px",
        }}
      >

        <div className="grid-3">

          <div className="card">
            <div style={{ fontSize: 30 }}>
              📊
            </div>

            <h2>Business Intelligence</h2>

            <p style={{ color: "#64748b" }}>
              Understand your business performance through
              simple, actionable insights.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: 30 }}>
              🌱
            </div>

            <h2>ESG Intelligence</h2>

            <p style={{ color: "#64748b" }}>
              Track environmental, social and governance
              performance.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: 30 }}>
              🤖
            </div>

            <h2>AI Simulation</h2>

            <p style={{ color: "#64748b" }}>
              Explore hypothetical decisions before applying
              them to your business.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default FrontUI;