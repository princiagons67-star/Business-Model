import { useEffect, useState } from "react";

function BudgetOptimizer() {
  const [budget, setBudget] = useState({
    totalBudget: "",
    marketing: "",
    operations: "",
    technology: "",
    employees: "",
    other: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedBudget = localStorage.getItem("budgetData");

    if (savedBudget) {
      setBudget(JSON.parse(savedBudget));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBudget((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveBudget = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "budgetData",
      JSON.stringify(budget)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const totalBudget = Number(budget.totalBudget) || 0;

  const marketing = Number(budget.marketing) || 0;
  const operations = Number(budget.operations) || 0;
  const technology = Number(budget.technology) || 0;
  const employees = Number(budget.employees) || 0;
  const other = Number(budget.other) || 0;

  const totalAllocation =
    marketing +
    operations +
    technology +
    employees +
    other;

  const remainingBudget =
    totalBudget - totalAllocation;

  const percentage = (amount) => {
    if (totalBudget === 0) return 0;

    return ((amount / totalBudget) * 100).toFixed(1);
  };

  const potentialSavings =
    remainingBudget > 0
      ? remainingBudget * 0.2
      : 0;

  return (
    <div>
      <h1>Budget Optimizer</h1>

      <p>
        Plan your startup budget and identify possible savings.
      </p>

      {/* BUDGET INPUT */}

      <div className="dashboard-section">

        <h2>Budget Input</h2>

        <form onSubmit={saveBudget}>

          <label>
            Total Budget
          </label>

          <input
            type="number"
            name="totalBudget"
            value={budget.totalBudget}
            onChange={handleChange}
            placeholder="Enter total budget"
            min="0"
            required
          />

          <label>
            Marketing Budget
          </label>

          <input
            type="number"
            name="marketing"
            value={budget.marketing}
            onChange={handleChange}
            placeholder="Marketing amount"
            min="0"
          />

          <label>
            Operations Budget
          </label>

          <input
            type="number"
            name="operations"
            value={budget.operations}
            onChange={handleChange}
            placeholder="Operations amount"
            min="0"
          />

          <label>
            Technology Budget
          </label>

          <input
            type="number"
            name="technology"
            value={budget.technology}
            onChange={handleChange}
            placeholder="Technology amount"
            min="0"
          />

          <label>
            Employee Budget
          </label>

          <input
            type="number"
            name="employees"
            value={budget.employees}
            onChange={handleChange}
            placeholder="Employee amount"
            min="0"
          />

          <label>
            Other Expenses
          </label>

          <input
            type="number"
            name="other"
            value={budget.other}
            onChange={handleChange}
            placeholder="Other expenses"
            min="0"
          />

          <br />

          <button type="submit">
            Save Budget
          </button>

          {saved && (
            <p>
              Budget saved successfully!
            </p>
          )}

        </form>
      </div>

      {/* EXPENSE BREAKDOWN */}

      <div className="dashboard-section">

        <h2>Expense Breakdown</h2>

        <p>
          Marketing: ₹{marketing.toLocaleString()} (
          {percentage(marketing)}%)
        </p>

        <p>
          Operations: ₹{operations.toLocaleString()} (
          {percentage(operations)}%)
        </p>

        <p>
          Technology: ₹{technology.toLocaleString()} (
          {percentage(technology)}%)
        </p>

        <p>
          Employees: ₹{employees.toLocaleString()} (
          {percentage(employees)}%)
        </p>

        <p>
          Other: ₹{other.toLocaleString()} (
          {percentage(other)}%)
        </p>

      </div>

      {/* BUDGET OPTIMIZATION */}

      <div className="dashboard-section">

        <h2>Budget Optimization</h2>

        <h3>
          Total Allocation: ₹
          {totalAllocation.toLocaleString()}
        </h3>

        <h3>
          Remaining Budget: ₹
          {remainingBudget.toLocaleString()}
        </h3>

      </div>

      {/* SAVINGS */}

      <div className="dashboard-section">

        <h2>Savings & Allocation Recommendations</h2>

        {remainingBudget > 0 ? (
          <p>
            You have ₹
            {remainingBudget.toLocaleString()} remaining.
            Consider keeping around ₹
            {potentialSavings.toLocaleString()} as a reserve.
          </p>
        ) : remainingBudget === 0 ? (
          <p>
            Your entire budget has been allocated.
          </p>
        ) : (
          <p>
            ⚠️ Your allocation is ₹
            {Math.abs(remainingBudget).toLocaleString()}
            {" "}over your total budget. Consider reducing
            some expenses.
          </p>
        )}

      </div>
    </div>
  );
}

export default BudgetOptimizer;