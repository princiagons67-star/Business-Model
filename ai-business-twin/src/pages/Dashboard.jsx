function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Business Twin Dashboard</h1>

      <p>Welcome to your business dashboard.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div>
          <h3>Revenue</h3>
          <h2>₹5,00,000</h2>
        </div>

        <div>
          <h3>Growth</h3>
          <h2>15%</h2>
        </div>

        <div>
          <h3>ESG Score</h3>
          <h2>82/100</h2>
        </div>

        <div>
          <h3>Budget Used</h3>
          <h2>70%</h2>
        </div>
      </div>

      <hr />

      <h2>AI Insights</h2>

      <p>
        Your business is showing positive growth.
      </p>
    </div>
  );
}

export default Dashboard;