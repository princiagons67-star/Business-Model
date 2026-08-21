import { useState } from "react";

function ESGCalculation() {
  const [scores, setScores] = useState({
    environmental: 82,
    social: 76,
    governance: 88,
  });

  const updateScore = (name, value) => {
    setScores((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const overall = Math.round(
    (scores.environmental +
      scores.social +
      scores.governance) / 3
  );

  const categories = [
    ["environmental", "Environmental", "🌱"],
    ["social", "Social", "👥"],
    ["governance", "Governance", "⚖"],
  ];

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <div>
          <h1>ESG Calculation</h1>
          <p>
            Measure your startup's sustainability performance.
          </p>
        </div>

        <span className="badge badge-green">
          Sustainability
        </span>
      </div>

      <div className="grid-2">

        <div className="card">

          <h2>Overall ESG Score</h2>

          <div className="esg-score">
            <span>{overall}</span>
          </div>

          <p
            style={{
              textAlign: "center",
              color: "#64748b",
            }}
          >
            {overall >= 80
              ? "Excellent performance"
              : "There is room for improvement"}
          </p>

        </div>

        <div className="card">

          <h2 style={{ marginTop: 0 }}>
            ESG Categories
          </h2>

          {categories.map(
            ([key, label, icon]) => (
              <div
                key={key}
                style={{
                  marginTop: 22,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span>
                    {icon} {label}
                  </span>

                  <strong>
                    {scores[key]}/100
                  </strong>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scores[key]}
                  onChange={(e) =>
                    updateScore(
                      key,
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    accentColor: "#0f766e",
                  }}
                />
              </div>
            )
          )}

        </div>

      </div>

      <div
        className="card"
        style={{ marginTop: 20 }}
      >
        <h2>ESG Improvement Suggestions</h2>

        <div className="grid-3">

          <div className="alert alert-success">
            🌱 Improve energy efficiency and
            reduce unnecessary resource usage.
          </div>

          <div className="alert alert-info">
            👥 Invest in employee development
            and inclusive workplace practices.
          </div>

          <div className="alert alert-info">
            ⚖ Maintain transparent governance
            and responsible business policies.
          </div>

        </div>
      </div>

    </div>
  );
}

export default ESGCalculation;