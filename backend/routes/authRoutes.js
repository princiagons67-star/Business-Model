const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("../database/database");

const router = express.Router();

// ===============================
// REGISTER NEW USER
// ===============================

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

    // -------------------------------
    // Validation
    // -------------------------------

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

    // -------------------------------
    // Check existing user
    // -------------------------------

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email.toLowerCase());

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // -------------------------------
    // Hash password
    // -------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // -------------------------------
    // Save user
    // -------------------------------

    const createUser = db.prepare(`
      INSERT INTO users
      (name, email, password, phone, role)
      VALUES (?, ?, ?, ?, ?)
    `);

    const userResult = createUser.run(
      name,
      email.toLowerCase(),
      hashedPassword,
      phone || "",
      role || "Founder"
    );

    const userId = userResult.lastInsertRowid;

    // -------------------------------
    // Save startup
    // -------------------------------

    const createStartup = db.prepare(`
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
    `);

    createStartup.run(
      userId,
      startupName || "",
      industry || "",
      businessModel || "",
      Number(employees) || 0,
      targetMarket || "",
      startupStage || "",
      businessGoals || ""
    );

    // -------------------------------
    // Create default ESG record
    // -------------------------------

    db.prepare(`
      INSERT INTO esg_data (user_id)
      VALUES (?)
    `).run(userId);

    // -------------------------------
    // Create default Budget record
    // -------------------------------

    db.prepare(`
      INSERT INTO budgets (user_id)
      VALUES (?)
    `).run(userId);

    // -------------------------------
    // Create default Ratings record
    // -------------------------------

    db.prepare(`
      INSERT INTO ratings (user_id)
      VALUES (?)
    `).run(userId);

    // -------------------------------
    // Create default Settings
    // -------------------------------

    db.prepare(`
      INSERT INTO settings (user_id)
      VALUES (?)
    `).run(userId);

    // -------------------------------
    // Response
    // -------------------------------

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      user: {
        id: userId,
        name,
        email: email.toLowerCase(),
        role: role || "Founder",
      },
    });

  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
});

module.exports = router;