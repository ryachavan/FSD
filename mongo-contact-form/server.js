import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// ----------------------
// MongoDB Connection
// ----------------------

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    const db = mongoose.connection;

    console.log("MongoDB Connected Successfully");
    console.log("DB connected:", db.name);
  })
  .catch(err => {
    console.error("MongoDB Connection Failed");
    console.error(err.message);
    process.exit(1);
  });

// ----------------------
// Schema & Model
// ----------------------

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  phone: {
    type: String,
    required: [true, "Phone is required"]
  }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

// ----------------------
// Routes
// ----------------------

// GET all contacts
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE contact
app.post("/api/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE contact
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE contact
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ----------------------
// Start Server
// ----------------------

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});