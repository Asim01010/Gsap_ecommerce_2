import e from "express";
import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required."],
    },
    gender: {
      type: String,
      required: [true, "Gender is required."],
    },
    terms: {
      type: Boolean,
      required: [true, "Terms acceptance is required."],
    },
    otp: {
      type: Number,
      default: null,
    },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Register", registerSchema);
