function FrontUI() {
  return (
    <div className="front-page">
      <h1>AI Business Twin</h1>

      <p>
        A Decision Support System for Sustainable Startup Planning
        Using Predictive Analytics and ESG Simulation.
      </p>

      <div className="capabilities">

        <div className="capability-card">
          <h2>📊 Predictive Analytics</h2>
          <p>
            Understand your business performance and future possibilities.
          </p>
        </div>

        <div className="capability-card">
          <h2>🌱 ESG Simulation</h2>
          <p>
            Understand your environmental, social and governance performance.
          </p>
        </div>

        <div className="capability-card">
          <h2>💰 Budget Optimisation</h2>
          <p>
            Plan your money and find better ways to use your budget.
          </p>
        </div>

        <div className="capability-card">
          <h2>🤖 AI Decision Support</h2>
          <p>
            Get AI-powered suggestions to help make business decisions.
          </p>
        </div>

      </div>

      <button>Get Started</button>
    </div>
  );
}

export default FrontUI;