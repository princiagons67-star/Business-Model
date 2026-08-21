import { useEffect, useState } from "react";

function Dashboard() {
  const [userName, setUserName] = useState("Founder");
  const [startupName, setStartupName] = useState("Your Startup");

  useEffect(() => {
    try {
      const user = JSON.parse(
        localStorage.getItem("userData") || "{}"
      );

      const startup = JSON.parse(
        localStorage.getItem("startupData") || "{}"
      );

      if (user.name) setUserName(user.name);
      if (startup.startupName) {
        setStartupName(startup.startupName);
      }
    } catch {
      console.log("Data loading error");
    }
  }, []);

  return (
    <div className="page-container fade-in">

      <div className="page-header">

        <div>
          <h1>
            Good morning, {userName} 👋
          </h1>

          <p>
            Here's your business overview for {startupName}.
          </p>
        </div>

        <span className="badge badge-green">
          ● Twin Active
        </span>

      </div>

      {/* KPI */}
      <div className="stats-grid">

        <div className="stat-card stat-green">
          <div className="stat-label">
            Monthly Revenue
          </div>

          <div className="stat-value">
            ₹5.0L
          </div>

          <div className="stat-description">
            ↑ 12.5% from last month
          </div>
        </div>

        <div className="stat-card stat-blue">
          <div className="stat-label">
            Business Growth
          </div>

          <div className="stat-value">
            15.2%
          </div>

          <div className="stat-description">
            Healthy growth trend
          </div>
        </div>

        <div className="stat-card stat-purple">
          <div className="stat-label">
            ESG Score
          </div>

          <div className="stat-value">
            82/100
          </div>

          <div className="stat-description">
            Above industry average
          </div>
        </div>

        <div className="stat-card stat-orange">
          <div className="stat-label">
            Budget Used
          </div>

          <div className="stat-value">
            70%
          </div>

          <div className="stat-description">
            ₹3.5L of ₹5L allocated
          </div>
        </div>

      </div>

      {/* MAIN */}
      <div className="grid-2">

        <div className="card">

          <div className="card-header">
            <div>
              <h2>Business Health</h2>
              <p>Current performance indicators</p>
            </div>

            <span className="badge badge-green">
              Healthy
            </span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
              }}
            >
              <span>Revenue</span>
              <strong>78%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: "78%" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
              }}
            >
              <span>Customer Growth</span>
              <strong>68%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: "68%" }}
              />
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
              }}
            >
              <span>Operational Efficiency</span>
              <strong>84%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: "84%" }}
              />
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
            <span>82</span>
          </div>

          <div
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: 13,
            }}
          >
            Excellent sustainability performance
          </div>

        </div>

      </div>

      {/* LOWER */}
      <div
        className="grid-2"
        style={{ marginTop: 20 }}
      >

        <div className="card">

          <div className="card-header">
            <div>
              <h2>AI Recommendations</h2>
              <p>Suggestions generated for your business</p>
            </div>
          </div>

          <div className="alert alert-info">
            <strong>Increase digital marketing</strong>
            <br />
            Your current customer acquisition rate suggests
            that additional digital campaigns could improve
            growth.
          </div>

          <div className="alert alert-success">
            <strong>ESG performance is strong</strong>
            <br />
            Continue your current sustainability initiatives.
          </div>

        </div>

        <div className="card">

          <div className="card-header">
            <div>
              <h2>Budget Overview</h2>
              <p>Current resource allocation</p>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Marketing</span>
              <strong>₹1.4L</strong>
            </div>

            <div
              className="progress"
              style={{ marginTop: 7 }}
            >
              <div
                className="progress-bar"
                style={{ width: "70%" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Operations</span>
              <strong>₹1.2L</strong>
            </div>

            <div
              className="progress"
              style={{ marginTop: 7 }}
            >
              <div
                className="progress-bar"
                style={{ width: "60%" }}
              />
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Technology</span>
              <strong>₹0.9L</strong>
            </div>

            <div
              className="progress"
              style={{ marginTop: 7 }}
            >
              <div
                className="progress-bar"
                style={{ width: "45%" }}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;