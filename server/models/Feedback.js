const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema(
    {
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
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Feedback", feedbackSchema)