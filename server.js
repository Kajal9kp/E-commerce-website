const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // Load .env

const app = express();
const PORT = 3000;

// Connect to MongoDB Atlas using MONGO_URI from .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Define schema and model
const NewsletterSchema = new mongoose.Schema({
  email: String,
});
const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

// POST endpoints
app.post("/submit", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send("Email is required");

  try {
    await Newsletter.create({ email });
    res.send("🎉 Thank you for subscribing!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving email");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
