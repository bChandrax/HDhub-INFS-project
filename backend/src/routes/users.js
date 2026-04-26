import { Router } from "express";
import bcrypt from "bcryptjs";
import db from "../db/database.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// All routes require auth
router.use(requireAuth);

function safeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

// ─── GET /api/users/me ────────────────────────────────────────────────────────

router.get("/me", (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user: safeUser(user) });
});

// ─── PATCH /api/users/me ──────────────────────────────────────────────────────

router.patch("/me", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const newName = name ? name.trim() : user.name;
    const newHash = password ? await bcrypt.hash(password, 12) : user.password;

    db.prepare("UPDATE users SET name = ?, password = ? WHERE id = ?")
      .run(newName, newHash, req.userId);

    const updated = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);
    res.json({ user: safeUser(updated) });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── GET /api/users/watchlist ─────────────────────────────────────────────────

router.get("/watchlist", (req, res) => {
  const items = db
    .prepare("SELECT * FROM watchlist WHERE user_id = ? ORDER BY added_at DESC")
    .all(req.userId);
  res.json({ watchlist: items });
});

// ─── POST /api/users/watchlist ────────────────────────────────────────────────

router.post("/watchlist", (req, res) => {
  const { movie_id, title, poster_path } = req.body;
  if (!movie_id || !title) {
    return res.status(400).json({ error: "movie_id and title are required" });
  }
  try {
    db.prepare(
      "INSERT OR IGNORE INTO watchlist (user_id, movie_id, title, poster_path) VALUES (?, ?, ?, ?)"
    ).run(req.userId, movie_id, title, poster_path || null);
    res.status(201).json({ message: "Added to watchlist" });
  } catch (err) {
    console.error("Watchlist add error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── DELETE /api/users/watchlist/:movieId ─────────────────────────────────────

router.delete("/watchlist/:movieId", (req, res) => {
  db.prepare("DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?")
    .run(req.userId, req.params.movieId);
  res.json({ message: "Removed from watchlist" });
});

// ─── GET /api/users/history ───────────────────────────────────────────────────

router.get("/history", (req, res) => {
  const items = db
    .prepare("SELECT * FROM watch_history WHERE user_id = ? ORDER BY watched_at DESC LIMIT 50")
    .all(req.userId);
  res.json({ history: items });
});

// ─── POST /api/users/history ──────────────────────────────────────────────────

router.post("/history", (req, res) => {
  const { movie_id, title, poster_path } = req.body;
  if (!movie_id || !title) {
    return res.status(400).json({ error: "movie_id and title are required" });
  }
  try {
    db.prepare(
      "INSERT INTO watch_history (user_id, movie_id, title, poster_path) VALUES (?, ?, ?, ?)"
    ).run(req.userId, movie_id, title, poster_path || null);
    res.status(201).json({ message: "Added to history" });
  } catch (err) {
    console.error("History add error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
