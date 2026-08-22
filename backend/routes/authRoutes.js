const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../database/database");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      startupName,
      industry,
      businessModel,
      employees,
      targetMarket,
      startupStage,
      businessGoals,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    db.get(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail],
      async (error, existingUser) => {
        if (error) {
          console.error(error);

          return res.status(500).json({
            success: false,
            message: "Database error.",
          });
        }

        if (existingUser) {
          return res.status(409).json({
            success: false,
            message: "An account with this email already exists.",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
          `
          INSERT INTO users
          (name, email, password, phone, role)
          VALUES (?, ?, ?, ?, ?)
          `,
          [
            name,
            cleanEmail,
            hashedPassword,
            phone || "",
            role || "Founder",
          ],
          function (insertError) {
            if (insertError) {
              console.error(insertError);

              return res.status(500).json({
                success: false,
                message: "Could not create user.",
              });
            }

            const userId = this.lastID;

            db.run(
              `
              INSERT INTO startups
              (
                user_id,
                startup_name,
                industry,
                business_model,
                employees,
                target_market,
                startup_stage,
                business_goals
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              `,
              [
                userId,
                startupName || "",
                industry || "",
                businessModel || "",
                Number(employees) || 0,
                targetMarket || "",
                startupStage || "",
                businessGoals || "",
              ],
              (startupError) => {
                if (startupError) {
                  console.error(startupError);

                  return res.status(500).json({
                    success: false,
                    message: "Could not save startup details.",
                  });
                }

                db.run(
                  "INSERT INTO esg_data (user_id) VALUES (?)",
                  [userId]
                );

                db.run(
                  "INSERT INTO budgets (user_id) VALUES (?)",
                  [userId]
                );

                db.run(
                  "INSERT INTO ratings (user_id) VALUES (?)",
                  [userId]
                );

                db.run(
                  "INSERT INTO settings (user_id) VALUES (?)",
                  [userId]
                );

                return res.status(201).json({
                  success: true,
                  message: "Registration successful!",
                  user: {
                    id: userId,
                    name,
                    email: cleanEmail,
                    role: role || "Founder",
                  },
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
});

// ===============================
// LOGIN
// ===============================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await new Promise((resolve, reject) => {
      db.get(
        `
        SELECT id, name, email, password, phone, role
        FROM users
        WHERE email = ?
        `,
        [email.toLowerCase()],
        (error, row) => {
          if (error) {
            reject(error);
          } else {
            resolve(row);
          }
        }
      );
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    res.json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});
// ===============================
// LOGIN USER
// ===============================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = db
      .prepare(
        `SELECT id, name, email, password, phone, role
         FROM users
         WHERE email = ?`
      )
      .get(email.toLowerCase());

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Account not found or password is incorrect.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Account not found or password is incorrect.",
      });
    }

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});

module.exports = router;