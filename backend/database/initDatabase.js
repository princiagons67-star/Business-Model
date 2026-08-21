const db = require("./database");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'Founder',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS startups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    startup_name TEXT,
    industry TEXT,
    business_model TEXT,
    employees INTEGER DEFAULT 0,
    target_market TEXT,
    startup_stage TEXT,
    business_goals TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS esg_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,

    energy_consumption REAL DEFAULT 0,
    renewable_percentage REAL DEFAULT 0,
    water_usage REAL DEFAULT 0,
    waste_recycled REAL DEFAULT 0,
    carbon_emissions REAL DEFAULT 0,

    employees INTEGER DEFAULT 0,
    employee_satisfaction REAL DEFAULT 0,
    diversity REAL DEFAULT 0,
    training REAL DEFAULT 0,
    workplace_safety REAL DEFAULT 0,

    board_independence REAL DEFAULT 0,
    ethics_policies REAL DEFAULT 0,
    ethics_training REAL DEFAULT 0,
    data_privacy REAL DEFAULT 0,
    risk_management REAL DEFAULT 0,

    environmental_score REAL DEFAULT 0,
    social_score REAL DEFAULT 0,
    governance_score REAL DEFAULT 0,
    overall_score REAL DEFAULT 0,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,

    total_budget REAL DEFAULT 0,
    marketing_budget REAL DEFAULT 0,
    operations_budget REAL DEFAULT 0,
    technology_budget REAL DEFAULT 0,
    employee_budget REAL DEFAULT 0,
    other_expenses REAL DEFAULT 0,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,

    business_rating INTEGER DEFAULT 0,
    sustainability_rating INTEGER DEFAULT 0,
    ai_rating INTEGER DEFAULT 0,
    feedback TEXT,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,

    notifications INTEGER DEFAULT 1,
    theme TEXT DEFAULT 'light',
    security_preference TEXT DEFAULT 'standard',

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );
`);

console.log("SQLite database tables created successfully");