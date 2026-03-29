const express = require("express")
const router = express.Router()
const Feedback = require("../models/Feedback")
const auth = require("../middleware/auth")

const MAX_ATTACHMENT_COUNT = 3
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024
const MAX_AUDIO_SIZE_BYTES = 5 * 1024 * 1024

const sanitizeAttachment = (file) => ({
  name: typeof file?.name === "string" ? file.name.trim() : "attachment",
  mimeType: typeof file?.mimeType === "string" ? file.mimeType.trim() : "application/octet-stream",
  size: Number(file?.size) || 0,
  dataUrl: typeof file?.dataUrl === "string" ? file.dataUrl.trim() : ""
})

router.get("/", auth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })
    res.json(feedbacks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const {
      message,
      category,
      isAnonymous = true,
      submitterName = "",
      rating,
      attachments = [],
      voiceNote = null
    } = req.body

    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: "Feedback message is required." })
    }

    const parsedRating = Number(rating)
    if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ error: "Rating must be a whole number between 1 and 5." })
    }

    if (!isAnonymous && !String(submitterName).trim()) {
      return res.status(400).json({ error: "Name is required when anonymous mode is turned off." })
    }

    const sanitizedAttachments = Array.isArray(attachments)
      ? attachments.slice(0, MAX_ATTACHMENT_COUNT).map(sanitizeAttachment)
      : []

    for (const file of sanitizedAttachments) {
      if (!file.mimeType.startsWith("image/")) {
        return res.status(400).json({ error: "Only image attachments are allowed." })
      }

      if (!file.dataUrl.startsWith("data:image/")) {
        return res.status(400).json({ error: "Image attachment format is invalid." })
      }

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        return res.status(400).json({ error: "Each image must be 2MB or smaller." })
      }
    }

    let sanitizedVoiceNote = null
    if (voiceNote && typeof voiceNote === "object") {
      sanitizedVoiceNote = {
        mimeType: typeof voiceNote.mimeType === "string" ? voiceNote.mimeType.trim() : "audio/webm",
        durationSeconds: Number(voiceNote.durationSeconds) || 0,
        dataUrl: typeof voiceNote.dataUrl === "string" ? voiceNote.dataUrl.trim() : ""
      }

      if (!sanitizedVoiceNote.dataUrl.startsWith("data:audio/")) {
        return res.status(400).json({ error: "Voice note format is invalid." })
      }

      const approxAudioSize = Buffer.byteLength(sanitizedVoiceNote.dataUrl, "utf8")
      if (approxAudioSize > MAX_AUDIO_SIZE_BYTES * 1.5) {
        return res.status(400).json({ error: "Voice note must be 5MB or smaller." })
      }
    }

    const feedback = new Feedback({
      message: String(message).trim(),
      category: String(category || "General").trim(),
      isAnonymous: Boolean(isAnonymous),
      submitterName: Boolean(isAnonymous) ? "" : String(submitterName).trim(),
      rating: parsedRating,
      attachments: sanitizedAttachments,
      voiceNote: sanitizedVoiceNote
    })

    await feedback.save()

    res.status(201).json({ message: "Feedback submitted successfully." })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
