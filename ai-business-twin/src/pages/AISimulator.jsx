import { useState } from "react";

function AISimulator() {
  const [growth, setGrowth] = useState(15);
  const [marketing, setMarketing] = useState(30);

  const projectedGrowth =
    growth + marketing * 0.2;

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <div>
          <h1>AI Business Simulator</h1>
          <p>
            Test hypothetical business scenarios before making decisions.
          </p>
        </div>

        <span className="badge badge-purple">
          Simulation Mode
        </span>
      </div>

      <div className="grid-2">

        <div className="card">

          <h2>Scenario Controls</h2>

          <div className="form-group">
            <label>
              Current Growth: {growth}%
            </label>

            <input
              type="range"
              min="0"
              max="50"
              value={growth}
              onChange={(e) =>
                setGrowth(Number(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#7c3aed",
              }}
            />
          </div>

          <div className="form-group">
            <label>
              Marketing Allocation: {marketing}%
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={marketing}
              onChange={(e) =>
                setMarketing(Number(e.target.value))
              }
              style={{
                width: "100%",
                accentColor: "#7c3aed",
              }}
            />
          </div>

        </div>

        <div className="card">

          <h2>Simulation Result</h2>

          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#7c3aed",
              margin: "25px 0 5px",
            }}
          >
            {projectedGrowth.toFixed(1)}%
          </div>

          <p style={{ color: "#64748b" }}>
            Projected growth under this scenario.
          </p>

          <div className="alert alert-info">
            ✦ This is a hypothetical scenario.
            Your actual startup data has not been changed.
          </div>

        </div>

      </div>

      <div
        className="card"
        style={{ marginTop: 20 }}
      >
        <h2>AI Recommendation</h2>

        <p style={{ color: "#64748b" }}>
          Increasing marketing investment may improve
          projected growth, but monitor customer acquisition
          costs and operational capacity before applying the
          scenario.
        </p>

        <button className="btn btn-primary">
          Save Scenario
        </button>

      </div>

    </div>
  );
}

export default AISimulator;