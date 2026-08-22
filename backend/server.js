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
// =========================
// DASHBOARD DATA
// =========================

app.get("/api/dashboard/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID.",
    });
  }

  const userQuery = `
    SELECT id, name, email, phone, role
    FROM users
    WHERE id = ?
  `;

  db.get(userQuery, [userId], (userError, user) => {
    if (userError) {
      console.error("User query error:", userError);

      return res.status(500).json({
        success: false,
        message: "Failed to get user data.",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const startupQuery = `
      SELECT
        startup_name,
        industry,
        business_model,
        employees,
        target_market,
        startup_stage,
        business_goals
      FROM startups
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 1
    `;

    db.get(
      startupQuery,
      [userId],
      (startupError, startup) => {
        if (startupError) {
          console.error(
            "Startup query error:",
            startupError
          );

          return res.status(500).json({
            success: false,
            message: "Failed to get startup data.",
          });
        }

        const esgQuery = `
          SELECT
            environmental_score,
            social_score,
            governance_score,
            overall_score
          FROM esg_data
          WHERE user_id = ?
        `;

        db.get(
          esgQuery,
          [userId],
          (esgError, esg) => {
            if (esgError) {
              console.error(
                "ESG query error:",
                esgError
              );

              return res.status(500).json({
                success: false,
                message: "Failed to get ESG data.",
              });
            }

            const budgetQuery = `
              SELECT
                total_budget,
                marketing_budget,
                operations_budget,
                technology_budget,
                employee_budget,
                other_expenses
              FROM budgets
              WHERE user_id = ?
            `;

            db.get(
              budgetQuery,
              [userId],
              (budgetError, budget) => {
                if (budgetError) {
                  console.error(
                    "Budget query error:",
                    budgetError
                  );

                  return res.status(500).json({
                    success: false,
                    message:
                      "Failed to get budget data.",
                  });
                }

                res.json({
                  success: true,

                  user: user,

                  startup: startup || null,

                  esg: esg || null,

                  budget: budget || null,
                });
              }
            );
          }
        );
      }
    );
  });
});
// =========================
// START SERVER
// =========================

// =========================
// DASHBOARD DATA
// =========================

app.get("/api/dashboard/:userId", (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const user = db
      .prepare(`
        SELECT id, name, email, phone, role
        FROM users
        WHERE id = ?
      `)
      .get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const startup = db
      .prepare(`
        SELECT
          startup_name,
          industry,
          business_model,
          employees,
          target_market,
          startup_stage,
          business_goals
        FROM startups
        WHERE user_id = ?
        ORDER BY id DESC
        LIMIT 1
      `)
      .get(userId);

    const esg = db
      .prepare(`
        SELECT
          environmental_score,
          social_score,
          governance_score,
          overall_score
        FROM esg_data
        WHERE user_id = ?
      `)
      .get(userId);

    const budget = db
      .prepare(`
        SELECT
          total_budget,
          marketing_budget,
          operations_budget,
          technology_budget,
          employee_budget,
          other_expenses
        FROM budgets
        WHERE user_id = ?
      `)
      .get(userId);

    res.json({
      success: true,
      user,
      startup: startup || null,
      esg: esg || null,
      budget: budget || null,
    });

  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard.",
    });
  }
});

// =========================
// DASHBOARD DATA
// =========================

app.get("/api/dashboard/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }

  db.get(
    `SELECT id, name, email, phone, role
     FROM users
     WHERE id = ?`,
    [userId],
    (error, user) => {

      if (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      db.get(
        `SELECT startup_name, industry, business_model,
                employees, target_market, startup_stage,
                business_goals
         FROM startups
         WHERE user_id = ?`,
        [userId],
        (error, startup) => {

          if (error) {
            return res.status(500).json({
              success: false,
              message: error.message,
            });
          }

          db.get(
            `SELECT environmental_score,
                    social_score,
                    governance_score,
                    overall_score
             FROM esg_data
             WHERE user_id = ?`,
            [userId],
            (error, esg) => {

              if (error) {
                return res.status(500).json({
                  success: false,
                  message: error.message,
                });
              }

              db.get(
                `SELECT total_budget,
                        marketing_budget,
                        operations_budget,
                        technology_budget,
                        employee_budget,
                        other_expenses
                 FROM budgets
                 WHERE user_id = ?`,
                [userId],
                (error, budget) => {

                  if (error) {
                    return res.status(500).json({
                      success: false,
                      message: error.message,
                    });
                  }

                  res.json({
                    success: true,
                    user,
                    startup,
                    esg,
                    budget,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

app.listen(PORT, () => {
  console.log(
    `AI Business Twin backend running on http://localhost:${PORT}`
  );
});