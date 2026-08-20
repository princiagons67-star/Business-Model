import { useState } from "react";

function ESGCalculation() {
  const [environmental, setEnvironmental] = useState({
    energy: 50,
    renewable: 50,
    water: 50,
    waste: 50,
    carbon: 50,
  });

  const [social, setSocial] = useState({
    employees: 50,
    satisfaction: 50,
    diversity: 50,
    training: 50,
    safety: 50,
  });

  const [governance, setGovernance] = useState({
    board: 50,
    ethics: 50,
    training: 50,
    privacy: 50,
    risk: 50,
  });

  const average = (values) => {
    const total = Object.values(values).reduce(
      (sum, value) => sum + Number(value),
      0
    );

    return total / Object.values(values).length;
  };

  const environmentalScore = average(environmental);
  const socialScore = average(social);
  const governanceScore = average(governance);

  const overallScore =
    environmentalScore * 0.3 +
    socialScore * 0.35 +
    governanceScore * 0.35;

  const getClassification = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Moderate";
    if (score >= 40) return "Needs Improvement";
    return "Critical";
  };

  const updateValue = (section, name, value) => {
    if (section === "environmental") {
      setEnvironmental((previous) => ({
        ...previous,
        [name]: value,
      }));
    }

    if (section === "social") {
      setSocial((previous) => ({
        ...previous,
        [name]: value,
      }));
    }

    if (section === "governance") {
      setGovernance((previous) => ({
        ...previous,
        [name]: value,
      }));
    }
  };

  const inputGroup = (title, data, section) => (
    <div className="dashboard-section">
      <h2>{title}</h2>

      {Object.entries(data).map(([name, value]) => (
        <div key={name} style={{ marginBottom: "15px" }}>
          <label>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(event) =>
              updateValue(section, name, event.target.value)
            }
          />

          <span> {value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1>ESG Calculation</h1>

      <p>
        Calculate your Environmental, Social and Governance
        performance.
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span>Environmental Score</span>
          <h2>{environmentalScore.toFixed(1)}</h2>
        </div>

        <div className="dashboard-card">
          <span>Social Score</span>
          <h2>{socialScore.toFixed(1)}</h2>
        </div>

        <div className="dashboard-card">
          <span>Governance Score</span>
          <h2>{governanceScore.toFixed(1)}</h2>
        </div>

        <div className="dashboard-card">
          <span>Overall ESG Score</span>
          <h2>{overallScore.toFixed(1)}/100</h2>
          <p>{getClassification(overallScore)}</p>
        </div>
      </div>

      {inputGroup(
        "Environmental",
        environmental,
        "environmental"
      )}

      {inputGroup(
        "Social",
        social,
        "social"
      )}

      {inputGroup(
        "Governance",
        governance,
        "governance"
      )}

      <div className="dashboard-section">
        <h2>Overall ESG Score</h2>

        <h1>{overallScore.toFixed(1)}/100</h1>

        <p>
          Classification:{" "}
          <strong>{getClassification(overallScore)}</strong>
        </p>

        <p>
          Environmental × 30% + Social × 35% +
          Governance × 35%
        </p>
      </div>
    </div>
  );
}

export default ESGCalculation;