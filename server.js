const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/projects", projectRoutes);

// 404 for unknown API endpoints under /api/projects
app.use("/api/projects/*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Serve static assets from the public folder (React build)
app.use(express.static(path.join(__dirname, "public")));

// Catch-all: send back index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
