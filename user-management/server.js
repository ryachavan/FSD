const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ================= CRUD ================= */

// CREATE
app.post("/addUser", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/updateUser/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ================= QUERYING ================= */

// Search by name
app.get("/search", async (req, res) => {
  const { name } = req.query;
  const users = await User.find({ name });
  res.json(users);
});

// Filter by email + age
app.get("/filter", async (req, res) => {
  const { email, minAge } = req.query;
  const users = await User.find({
    email,
    age: { $gte: minAge }
  });
  res.json(users);
});

// Find by hobbies
app.get("/hobby", async (req, res) => {
  const { hobby } = req.query;
  const users = await User.find({ hobbies: hobby });
  res.json(users);
});

// Text search
app.get("/textsearch", async (req, res) => {
  const { keyword } = req.query;
  const users = await User.find(
    { $text: { $search: keyword } }
  );
  res.json(users);
});

// Pagination + Sorting
app.get("/pagination", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  const users = await User.find()
    .sort({ age: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(users);
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);