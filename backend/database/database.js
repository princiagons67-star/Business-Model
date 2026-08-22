const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const databaseFolder = __dirname;

if (!fs.existsSync(databaseFolder)) {
  fs.mkdirSync(databaseFolder, { recursive: true });
}

const dbPath = path.join(databaseFolder, "business_twin.db");

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error("SQLite connection failed:", error.message);
  } else {
    console.log("SQLite database connected successfully");
  }
});

db.run("PRAGMA foreign_keys = ON");

module.exports = db;