const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const Admin = require("../models/Admin")

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Admin route working" })
})

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      })
    }

    const admin = await Admin.findOne({ username })

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password"
      })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password"
      })
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        username: admin.username
      }
    })
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message })
  }
})

module.exports = router