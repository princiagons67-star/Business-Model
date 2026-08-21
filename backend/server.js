const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("./database/database");

// Create tables
require("./database/initDatabase");

const authRoutes = require("./routes/authRoutes");


const app = express();

const PORT = process.env.PORT || 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Business Twin Backend is running!",
    database: "SQLite",
  });
});

// =========================
// DATABASE TEST ROUTE
// =========================

app.get("/api/test-db", (req, res) => {
  try {
    const result = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all();

    res.json({
      success: true,
      tables: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `AI Business Twin backend running on http://localhost:${PORT}`
  );
});