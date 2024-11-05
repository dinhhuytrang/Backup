const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");
const nodemailer = require("nodemailer");
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
      email, // Include email if you want to store it
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
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


    res.json({ token, user: { id: user._id, username: user.username} });

  } catch (error) {
    next(error);
  }
});

// Forgot Password
authRouter.post("/forgotpw", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetCode = Math.random().toString(36).slice(-8);
    user.resetCode = resetCode;
    user.resetCodeExpiry = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `Your password reset code is: ${resetCode}. Please use it to reset your password.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      message: "A password reset code has been sent to your registered email",
    });
  } catch (error) {
    next(error);
  }
});

// Change Password
authRouter.post("/changepw", async (req, res, next) => {
  try {
    const { resetCode, newPassword, confirmPassword } = req.body;

    // Log the reset code and check the database for matching user
    console.log("Reset Code:", resetCode); // Debugging line
    const user = await User.findOne({
      resetCode: resetCode, // Make sure this matches the correct field name
      resetCodeExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset code" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetCode = undefined; 
    user.resetCodeExpiry = undefined; 
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error); // Debugging line
    next(error);
  }
});


module.exports = authRouter;
