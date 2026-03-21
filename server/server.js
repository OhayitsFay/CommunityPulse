require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get("/", (req, res) => {
  res.send("CommunityPulse API is running...")
})

// Import routes
const feedbackRoutes = require("./routes/feedback")
const adminRoutes = require("./routes/admin")

app.use("/api/feedback", feedbackRoutes)
app.use("/api/admin", adminRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})