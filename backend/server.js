// server.js
// Express Server - Main entry point for PostCraft AI backend
// Handles API routes for AI text generation
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// ROUTES
const aiTextRoutes = require("./routes/aiTextRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API ROUTES
app.use("/api/ai-text", aiTextRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AI Engine running on port ${PORT}`);
});
