import express from "express";
import {
  loginUser,
  registerController,
  verifyOTP,
} from "../controllers/registerController.js";

const RegisterRoute = express.Router();

// Register
RegisterRoute.post("/", registerController);

// Verify OTP
RegisterRoute.post("/verify-otp/:user_id", verifyOTP);

// Login
RegisterRoute.post("/login-user", loginUser);

export default RegisterRoute;
