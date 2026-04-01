const express = require("express")
const router = express.Router()
const Feedback = require("../models/Feedback")
const auth = require("../middleware/auth")

// Submit feedback (NO LOGIN)
router.post("/", async (req, res) => {
  try {

    const { message, category } = req.body

    const feedback = new Feedback({
      message,
      category
    })

    await feedback.save()

    res.json({ message: "Feedback submitted successfully" })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all feedback (ADMIN ONLY)
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 })
  res.json(feedbacks)
})

module.exports = router