// -----------------------------
// 1️⃣ Imports
// -----------------------------
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// -----------------------------
// 2️⃣ Config
// -----------------------------
const app = express();
const PORT = process.env.PORT || 4000;
const SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

// -----------------------------
// 3️⃣ Middleware
// -----------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// 4️⃣ MongoDB Connection
// -----------------------------
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -----------------------------
// 5️⃣ User Schema & Model
// -----------------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// -----------------------------
// 6️⃣ Auth Middleware
// -----------------------------
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// -----------------------------
// 7️⃣ Routes
// -----------------------------

// Public pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ email: user.email, id: user._id }, SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Protected user info
app.get("/api/user", authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// -----------------------------
// 8️⃣ Start Server
// -----------------------------
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
