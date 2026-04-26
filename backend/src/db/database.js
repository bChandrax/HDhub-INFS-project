import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DB_PATH = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(__dirname, "../../data/streamvault.db");

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const SQL = await initSqlJs();

let db;
if (fs.existsSync(DB_PATH)) {
  db = new SQL.Database(fs.readFileSync(DB_PATH));
} else {
  db = new SQL.Database();
}

function save() {
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
}

// ─── Run each CREATE TABLE separately (sql.js doesn't support multi-statement db.run) ──

db.run(`PRAGMA foreign_keys = ON`);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password   TEXT NOT NULL,
    plan       TEXT NOT NULL DEFAULT 'Free',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS watchlist (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id    INTEGER NOT NULL,
    title       TEXT NOT NULL,
    poster_path TEXT,
    added_at    TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, movie_id)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS watch_history (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id    INTEGER NOT NULL,
    title       TEXT NOT NULL,
    poster_path TEXT,
    watched_at  TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

save();

// ─── Helpers ─────────────────────────────────────────────────────────────────

function prepare(sql) {
  return {
    get(...params) {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      const row = stmt.step() ? stmt.getAsObject() : undefined;
      stmt.free();
      return row;
    },
    all(...params) {
      const results = [];
      const stmt = db.prepare(sql);
      stmt.bind(params);
      while (stmt.step()) results.push(stmt.getAsObject());
      stmt.free();
      return results;
    },
    run(...params) {
      db.run(sql, params);
      // Get the last inserted rowid immediately after the write
      const rowid = db.exec("SELECT last_insert_rowid()")[0]?.values[0][0] ?? null;
      save();
      return { lastInsertRowid: rowid };
    }
  };
}

export default { prepare };
