import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/auth",  authRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

// 404 handler
app.use((req, res) => res.status(404).json({ error: `Route ${req.method} ${req.path} not found` }));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅  StreamVault API running on http://localhost:${PORT}`);
});
// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅  StreamVault API running on http://localhost:${PORT}`);
});
