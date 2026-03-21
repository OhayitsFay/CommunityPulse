const express = require("express")
const router = express.Router()
const Feedback = require("../models/Feedback")

// Get all feedback
router.get("/", async (req, res) => {
  try {
    const { category } = req.query

    const filter = {}
    if (category) {
      filter.category = category
    }

    const feedbackList = await Feedback.find(filter).sort({ createdAt: -1 })

    res.json(feedbackList)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback", error: error.message })
  }
})

// Save feedback
router.post("/", async (req, res) => {
  try {
    const { message, category, sentiment, isAnonymous } = req.body

    if (!message || !category) {
      return res.status(400).json({
        message: "Message and category are required"
      })
    }

    const newFeedback = new Feedback({
      message,
      category,
      sentiment,
      isAnonymous
    })

    const savedFeedback = await newFeedback.save()

    res.status(201).json({
      message: "Feedback received successfully",
      data: savedFeedback
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to save feedback", error: error.message })
  }
})

module.exports = router