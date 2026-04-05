const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    index: true // Single field index
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  hobbies: [
    {
      type: String
    }
  ],
  bio: {
    type: String
  },
  userId: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound Index
userSchema.index({ email: 1, age: -1 });

// Multikey Index (array auto becomes multikey)
userSchema.index({ hobbies: 1 });

// Text Index
userSchema.index({ bio: "text" });

// Hashed Index
userSchema.index({ userId: "hashed" });

// TTL Index (1 hour example)
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = mongoose.model("User", userSchema);