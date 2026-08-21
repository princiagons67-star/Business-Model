import { useState } from "react";

function BudgetOptimizer() {
  const [budget, setBudget] = useState(500000);

  const [allocation, setAllocation] = useState({
    marketing: 30,
    operations: 25,
    technology: 20,
    people: 15,
    sustainability: 10,
  });

  const total = Object.values(allocation).reduce(
    (sum, value) => sum + Number(value),
    0
  );

  const update = (name, value) => {
    setAllocation({
      ...allocation,
      [name]: Number(value),
    });
  };

  const categories = [
    ["marketing", "Marketing", "30%"],
    ["operations", "Operations", "25%"],
    ["technology", "Technology", "20%"],
    ["people", "People", "15%"],
    ["sustainability", "Sustainability", "10%"],
  ];

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <div>
          <h1>Budget Optimizer</h1>
          <p>
            Plan and optimise your startup budget.
          </p>
        </div>

        <span className="badge badge-blue">
          AI Optimisation
        </span>
      </div>

      <div className="stats-grid">

        <div className="stat-card stat-blue">
          <div className="stat-label">
            Total Budget
          </div>

          <div className="stat-value">
            ₹{budget.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-label">
            Allocated
          </div>

          <div className="stat-value">
            {total}%
          </div>
        </div>

        <div className="stat-card stat-orange">
          <div className="stat-label">
            Remaining
          </div>

          <div className="stat-value">
            {Math.max(0, 100 - total)}%
          </div>
        </div>

      </div>

      <div className="card">

        <div className="form-group">
          <label>Total Budget</label>

          <input
            className="form-control"
            type="number"
            value={budget}
            onChange={(e) =>
              setBudget(Number(e.target.value))
            }
          />
        </div>

        {categories.map(([key, name]) => (
          <div
            key={key}
            style={{
              marginBottom: 22,
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
              }}
            >
              <strong>{name}</strong>

              <span>
                {allocation[key]}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={allocation[key]}
              onChange={(e) =>
                update(key, e.target.value)
              }
              style={{
                width: "100%",
                accentColor: "#0f766e",
              }}
            />

          </div>
        ))}

        <div
          className={
            total === 100
              ? "alert alert-success"
              : "alert alert-info"
          }
        >
          {total === 100
            ? "✓ Your budget is fully allocated."
            : `You have ${Math.abs(
                100 - total
              )}% ${total < 100 ? "unallocated" : "over-allocated"}.`}
        </div>

      </div>

    </div>
  );
}

export default BudgetOptimizer;