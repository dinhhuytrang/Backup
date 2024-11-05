const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");
const authRouter = express.Router();

// Environment variables
require("dotenv").config();
// Registration
authRouter.post("/register", async (req, res, next) => {
    try {
      const { email, username, password, confirmpassword } = req.body;
  
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username is already taken" });
      }
  
      // Check if passwords match
      if (password !== confirmpassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        email,      // Include email if you want to store it
        username,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Optionally, generate a token (if you want to auto-login after registration)
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      // Send response
      res
        .status(201)
        .json({ token, user: { id: newUser._id, username: newUser.username } });
    } catch (error) {
      next(error);
    }
  });
  
// Login
authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Users not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user._id, username: user.username , fullname: user.fullname} });
  } catch (error) {
    next(error);
  }
});

// Forgot Password
authRouter.post("/forgotpw", async (req, res, next) => {
  try {
    const { username } = req.body; // Changed to username

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a verification code (in a real app, you'd send an email)
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Generate a 6-digit code
    user.verificationCode = verificationCode; // Save it temporarily for the demo

    await user.save();

    // Ideally, you would send the verification code via email
    res.json({
      message: "Verification code sent to your registered email",
      verificationCode,
    });
  } catch (error) {
    next(error);
  }
});

// Verification of the code (you can extend this functionality)
authRouter.post("/verify", async (req, res, next) => {
  try {
    const { username, code } = req.body; // Changed to username

    // Find user by username
    const user = await User.findOne({ username });
    if (!user || user.verificationCode !== code) {
      return res.status(401).json({ message: "Invalid verification code" });
    }

    res.json({
      message: "Verification successful, you can now reset your password",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
