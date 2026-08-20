import { useState } from "react";

function AISimulator() {
  const [scenario, setScenario] = useState({
    name: "",
    change: "",
  });

  const [scenarios, setScenarios] = useState([]);

  const [selectedA, setSelectedA] = useState("");
  const [selectedB, setSelectedB] = useState("");

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const createScenario = (event) => {
    event.preventDefault();

    if (!scenario.name || !scenario.change) {
      alert("Please enter scenario details.");
      return;
    }

    let financialImpact = 0;
    let esgImpact = 0;
    let riskLevel = "Medium";
    let outcome = "";

    if (scenario.change === "marketing") {
      financialImpact = 15;
      esgImpact = 2;
      riskLevel = "Medium";
      outcome =
        "Higher marketing investment may improve customer acquisition and revenue.";
    }

    if (scenario.change === "operations") {
      financialImpact = 10;
      esgImpact = 3;
      riskLevel = "Low";
      outcome =
        "Reducing operational costs may improve profitability.";
    }

    if (scenario.change === "renewable") {
      financialImpact = -5;
      esgImpact = 15;
      riskLevel = "Low";
      outcome =
        "Increasing renewable energy may improve sustainability performance.";
    }

    if (scenario.change === "training") {
      financialImpact = -3;
      esgImpact = 10;
      riskLevel = "Low";
      outcome =
        "Increasing employee training may improve workforce performance.";
    }

    const newScenario = {
      id: Date.now(),
      name: scenario.name,
      change: scenario.change,
      financialImpact,
      esgImpact,
      riskLevel,
      outcome,
    };

    setScenarios((previous) => [
      ...previous,
      newScenario,
    ]);

    setScenario({
      name: "",
      change: "",
    });
  };

  const scenarioA = scenarios.find(
    (item) => item.id.toString() === selectedA
  );

  const scenarioB = scenarios.find(
    (item) => item.id.toString() === selectedB
  );

  const getRecommendation = () => {
    if (!scenarioA || !scenarioB) {
      return null;
    }

    const scoreA =
      scenarioA.financialImpact +
      scenarioA.esgImpact;

    const scoreB =
      scenarioB.financialImpact +
      scenarioB.esgImpact;

    return scoreA >= scoreB
      ? scenarioA
      : scenarioB;
  };

  const recommendedScenario = getRecommendation();

  return (
    <div>
      <h1>AI Suggestions / AI Simulator</h1>

      <p>
        Create business scenarios and compare their possible
        financial, ESG and risk impacts.
      </p>

      {/* AI BUSINESS SUGGESTIONS */}

      <div className="dashboard-section">
        <h2>AI Business Suggestions</h2>

        <ul>
          <li>
            Consider improving your sustainability practices.
          </li>

          <li>
            Maintain a reserve for unexpected expenses.
          </li>

          <li>
            Invest in employee development.
          </li>

          <li>
            Review your marketing spending regularly.
          </li>
        </ul>
      </div>

      {/* SCENARIO CREATION */}

      <div className="dashboard-section">

        <h2>Scenario Creation</h2>

        <form onSubmit={createScenario}>

          <label>
            Scenario Name
          </label>

          <input
            type="text"
            value={scenario.name}
            onChange={(event) =>
              setScenario({
                ...scenario,
                name: event.target.value,
              })
            }
            placeholder="Example: Green Growth Plan"
          />

          <label>
            Scenario Change
          </label>

          <select
            value={scenario.change}
            onChange={(event) =>
              setScenario({
                ...scenario,
                change: event.target.value,
              })
            }
          >
            <option value="">
              Select a change
            </option>

            <option value="marketing">
              Increase marketing budget
            </option>

            <option value="operations">
              Reduce operational costs
            </option>

            <option value="renewable">
              Increase renewable energy
            </option>

            <option value="training">
              Increase employee training
            </option>
          </select>

          <br />

          <button type="submit">
            Create Scenario
          </button>

        </form>

      </div>

      {/* CREATED SCENARIOS */}

      <div className="dashboard-section">

        <h2>Created Scenarios</h2>

        {scenarios.length === 0 ? (
          <p>
            No scenarios created yet.
          </p>
        ) : (
          scenarios.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <h3>{item.name}</h3>

              <p>
                Financial Impact:{" "}
                {item.financialImpact > 0
                  ? "+"
                  : ""}
                {item.financialImpact}%
              </p>

              <p>
                ESG Impact: +
                {item.esgImpact} points
              </p>

              <p>
                Risk Level: {item.riskLevel}
              </p>

              <p>
                Expected Outcome: {item.outcome}
              </p>
            </div>
          ))
        )}

      </div>

      {/* SCENARIO COMPARISON */}

      <div className="dashboard-section">

        <h2>Scenario Comparison</h2>

        <label>
          Scenario A
        </label>

        <select
          value={selectedA}
          onChange={(event) =>
            setSelectedA(event.target.value)
          }
        >
          <option value="">
            Select Scenario A
          </option>

          {scenarios.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        <br />

        <label>
          Scenario B
        </label>

        <select
          value={selectedB}
          onChange={(event) =>
            setSelectedB(event.target.value)
          }
        >
          <option value="">
            Select Scenario B
          </option>

          {scenarios.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

        {scenarioA && scenarioB && (
          <div style={{ marginTop: "20px" }}>

            <h3>Comparison</h3>

            <p>
              <strong>{scenarioA.name}</strong>
              {" "}Financial Impact:{" "}
              {scenarioA.financialImpact}%
            </p>

            <p>
              <strong>{scenarioB.name}</strong>
              {" "}Financial Impact:{" "}
              {scenarioB.financialImpact}%
            </p>

            <p>
              <strong>{scenarioA.name}</strong>
              {" "}ESG Impact: +
              {scenarioA.esgImpact}
            </p>

            <p>
              <strong>{scenarioB.name}</strong>
              {" "}ESG Impact: +
              {scenarioB.esgImpact}
            </p>

          </div>
        )}

      </div>

      {/* AI RECOMMENDATION */}

      <div className="dashboard-section">

        <h2>AI Recommendation</h2>

        {!recommendedScenario ? (
          <p>
            Create and select two scenarios to receive an
            AI recommendation.
          </p>
        ) : (
          <>
            <h3>
              Recommended Scenario:
            </h3>

            <h2>
              {recommendedScenario.name}
            </h2>

            <p>
              This scenario provides the better combined
              financial and ESG impact.
            </p>

            <button
              onClick={() =>
                setShowConfirmation(true)
              }
            >
              Apply Scenario
            </button>
          </>
        )}

      </div>

      {/* CONFIRMATION MODAL */}

      {showConfirmation && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              maxWidth: "400px",
            }}
          >

            <h2>
              Apply Scenario?
            </h2>

            <p>
              Are you sure you want to apply this scenario
              to your business plan?
            </p>

            <button
              onClick={() => {
                alert(
                  "Scenario approved. Actual business data will be connected later."
                );

                setShowConfirmation(false);
              }}
            >
              Apply
            </button>

            <button
              onClick={() =>
                setShowConfirmation(false)
              }
              style={{
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default AISimulator;