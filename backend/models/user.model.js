import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true
  }
}, {timestamps: true});

// User Model
export const User = mongoose.model('User', userSchema);