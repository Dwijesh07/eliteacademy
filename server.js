import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);

// Serve static files
app.use(express.static("public"));

app.get("/register.html", (req, res) => {
  res.sendFile(path.resolve("register.html")); // path to root folder
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.resolve("public/login.html"));
});

// Fallback to index for any other route
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
