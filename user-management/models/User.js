import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    index: true
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

  hobbies: [String],

  bio: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound Index
userSchema.index({ email: 1, age: -1 });

// Multikey Index
userSchema.index({ hobbies: 1 });

// Text Index
userSchema.index({ bio: "text" });

export default mongoose.model("User", userSchema);