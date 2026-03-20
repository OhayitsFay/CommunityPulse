const express = require("express")
const router = express.Router()

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Feedback route working" })
})

// Placeholder for POST
router.post("/", (req, res) => {
  const { message, category } = req.body
  res.json({
    message: "Feedback received",
    data: { message, category }
  })
})

module.exports = router