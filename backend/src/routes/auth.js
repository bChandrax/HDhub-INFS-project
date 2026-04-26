import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/database.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── Helper ───────────────────────────────────────────────────────────────────

function signToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function safeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

// ─── POST /api/auth/register ──────────────────────────────────────────────────

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists" });
    }

    const hash = await bcrypt.hash(password, 12);

    const result = db
      .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
      .run(name.trim(), email.toLowerCase().trim(), hash);

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
    const token = signToken(user.id);

    return res.status(201).json({ token, user: safeUser(user) });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email.toLowerCase().trim());

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken(user.id);
    return res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────

router.get("/me", requireAuth, (req, res) => {
  try {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ user: safeUser(user) });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
