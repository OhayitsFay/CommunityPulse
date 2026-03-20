const express = require("express")
const router = express.Router()

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Admin route working" })
})

// Login placeholder
router.post("/login", (req, res) => {
  const { username, password } = req.body

  res.json({
    message: "Login endpoint working",
    user: username
  })
})

module.exports = router