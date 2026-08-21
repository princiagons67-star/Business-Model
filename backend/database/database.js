const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// Database folder
const databaseFolder = path.join(__dirname);

// Make sure database folder exists
if (!fs.existsSync(databaseFolder)) {
  fs.mkdirSync(databaseFolder, { recursive: true });
}

// SQLite database file
const dbPath = path.join(databaseFolder, "business_twin.db");

const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

console.log("SQLite database connected successfully");

module.exports = db;