import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const savedUser = JSON.parse(
          localStorage.getItem("userData") || "null"
        );

        if (!savedUser || !savedUser.id) {
          setError("User information not found. Please sign in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/dashboard/${savedUser.id}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to load dashboard."
          );
        }

        setData(result);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="card">
          <h2>Loading your business data...</h2>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  const user = data.user;
  const startup = data.startup || {};
  const esg = data.esg || {};
  const budget = data.budget || {};

  const overallESG = Number(esg.overall_score || 0);

  return (
    <div className="page-container fade-in">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>
            Welcome, {user.name} 👋
          </h1>

          <p>
            Here's your business overview for{" "}
            <strong>
              {startup.startup_name || "Your Startup"}
            </strong>
            .
          </p>
        </div>

        <span className="badge badge-green">
          ● Twin Active
        </span>
      </div>

      {/* STARTUP INFORMATION */}
      <div className="stats-grid">

        <div className="stat-card stat-blue">
          <div className="stat-label">
            Startup
          </div>

          <div className="stat-value">
            {startup.startup_name || "Not set"}
          </div>

          <div className="stat-description">
            {startup.industry || "Industry not set"}
          </div>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-label">
            Employees
          </div>

          <div className="stat-value">
            {startup.employees || 0}
          </div>

          <div className="stat-description">
            Current team size
          </div>
        </div>

        <div className="stat-card stat-purple">
          <div className="stat-label">
            ESG Score
          </div>

          <div className="stat-value">
            {overallESG}/100
          </div>

          <div className="stat-description">
            Sustainability performance
          </div>
        </div>

        <div className="stat-card stat-orange">
          <div className="stat-label">
            Total Budget
          </div>

          <div className="stat-value">
            ₹{Number(budget.total_budget || 0).toLocaleString("en-IN")}
          </div>

          <div className="stat-description">
            Current allocated budget
          </div>
        </div>

      </div>

      {/* BUSINESS INFORMATION */}
      <div className="grid-2">

        <div className="card">

          <div className="card-header">
            <div>
              <h2>Startup Overview</h2>
              <p>Your registered business information</p>
            </div>
          </div>

          <div className="info-list">

            <div>
              <span>Startup Name</span>
              <strong>
                {startup.startup_name || "Not provided"}
              </strong>
            </div>

            <div>
              <span>Industry</span>
              <strong>
                {startup.industry || "Not provided"}
              </strong>
            </div>

            <div>
              <span>Business Model</span>
              <strong>
                {startup.business_model || "Not provided"}
              </strong>
            </div>

            <div>
              <span>Target Market</span>
              <strong>
                {startup.target_market || "Not provided"}
              </strong>
            </div>

            <div>
              <span>Startup Stage</span>
              <strong>
                {startup.startup_stage || "Not provided"}
              </strong>
            </div>

          </div>

        </div>

        {/* ESG */}
        <div className="card">

          <div className="card-header">
            <div>
              <h2>ESG Performance</h2>
              <p>Sustainability snapshot</p>
            </div>
          </div>

          <div className="esg-score">
            <span>{overallESG}</span>
          </div>

          <div className="esg-breakdown">

            <div>
              <span>Environmental</span>
              <strong>
                {Number(
                  esg.environmental_score || 0
                )}
              </strong>
            </div>

            <div>
              <span>Social</span>
              <strong>
                {Number(esg.social_score || 0)}
              </strong>
            </div>

            <div>
              <span>Governance</span>
              <strong>
                {Number(esg.governance_score || 0)}
              </strong>
            </div>

          </div>

        </div>

      </div>

      {/* BUDGET */}
      <div
        className="card"
        style={{ marginTop: "20px" }}
      >

        <div className="card-header">
          <div>
            <h2>Budget Overview</h2>
            <p>Current resource allocation</p>
          </div>
        </div>

        <div className="budget-row">
          <span>Marketing</span>
          <strong>
            ₹{Number(
              budget.marketing_budget || 0
            ).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="budget-row">
          <span>Operations</span>
          <strong>
            ₹{Number(
              budget.operations_budget || 0
            ).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="budget-row">
          <span>Technology</span>
          <strong>
            ₹{Number(
              budget.technology_budget || 0
            ).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="budget-row">
          <span>Employees</span>
          <strong>
            ₹{Number(
              budget.employee_budget || 0
            ).toLocaleString("en-IN")}
          </strong>
        </div>

      </div>

      {/* AI RECOMMENDATIONS */}
      <div
        className="card"
        style={{ marginTop: "20px" }}
      >

        <div className="card-header">
          <div>
            <h2>AI Business Insights</h2>
            <p>Suggestions based on your current data</p>
          </div>
        </div>

        <div className="alert alert-info">
          <strong>Complete your business data</strong>
          <br />
          Add ESG measurements and budget information to
          receive more meaningful business recommendations.
        </div>

      </div>

    </div>
  );
}

export default Dashboard;