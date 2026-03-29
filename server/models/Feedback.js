const mongoose = require("mongoose")

const attachmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    mimeType: {
      type: String,
      trim: true
    },
    size: {
      type: Number,
      default: 0
    },
    dataUrl: {
      type: String,
      trim: true
    }
  },
  { _id: false }
)

const audioSchema = new mongoose.Schema(
  {
    mimeType: {
      type: String,
      trim: true
    },
    durationSeconds: {
      type: Number,
      default: 0
    },
    dataUrl: {
      type: String,
      trim: true
    }
  },
  { _id: false }
)

const feedbackSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    default: "General"
  },
  sentiment: {
    type: String,
    enum: ["positive", "neutral", "negative"],
    default: "neutral"
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  submitterName: {
    type: String,
    trim: true,
    default: ""
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  attachments: {
    type: [attachmentSchema],
    default: []
  },
  voiceNote: {
    type: audioSchema,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Feedback", feedbackSchema)
