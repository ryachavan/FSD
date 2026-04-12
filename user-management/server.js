import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/User.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    console.log("Connected DB:", mongoose.connection.name);
    await User.syncIndexes();
  })
  .catch(err => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

// CREATE
app.post("/addUser", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// querying/filtering
app.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    const users = await User.find({
      name: { $regex: name, $options: "i" }
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/filter", async (req, res) => {
  try {
    const { email, minAge } = req.query;

    const query = {};

    if (email) {
      query.email = { $regex: email, $options: "i" };
    }

    if (minAge) {
      query.age = { $gte: parseInt(minAge) };
    }

    const users = await User.find(query);

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/hobby", async (req, res) => {
  try {
    const { hobby } = req.query;

    const users = await User.find({
      hobbies: { $regex: hobby, $options: "i" }
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Text search
app.get("/textsearch", async (req, res) => {
  try {
    const { keyword } = req.query;

    const users = await User.find({
      $text: { $search: keyword }
    });

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pagination + Sorting
app.get("/pagination", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const users = await User.find()
      .sort({ age: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});