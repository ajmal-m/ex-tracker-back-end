const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/token.util");
const dotenv = require("dotenv");

dotenv.config();

exports.signup = async (req, res) => {
  try {
    const {  email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({ password : hashedPassword , email : email});

    // Token generation
    const token = generateToken(user);

    res.cookie("token", token, {
        httpOnly: true,  
        secure: process.env.NODE_ENV === "production", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "Strict",
    });

    res.status(201).json({ 
        message: "User registered successfully",
        user: { id: user._id, email: user.email }
     });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Token Generation
    const token = generateToken(user);

    res.cookie("token", token, {
        httpOnly: true,  
        secure: process.env.NODE_ENV === "production", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "Strict",
    });

    res.status(201).json({ 
        message: "User Logged successfully",
        user: { id: user._id, email: user.email }
    });


  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.logout = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server error during logout" });
    }
};

exports.verifyAuth = async (req, res) => {
  try {
      const token = req.cookies?.token;
    
      if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }
    
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      res.status(200).json({
        message:"Successfully authenticated.",
        user: decoded
      })
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(500).json({ message: "Server error" });
  }
}
