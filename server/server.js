<<<<<<< HEAD
const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

=======
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
>>>>>>> 1cd02310a2f48e10ffec43b8bc08bacd8a298dd9
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
<<<<<<< HEAD
  res.send("CommunityPulse API running")
})

const PORT = 5000
=======
  res.send("CommunityPulse API is running...")
})

// Import routes
const feedbackRoutes = require("./routes/feedback")
const adminRoutes = require("./routes/admin")

app.use("/api/feedback", feedbackRoutes)
app.use("/api/admin", adminRoutes)

const PORT = process.env.PORT || 5000
>>>>>>> 1cd02310a2f48e10ffec43b8bc08bacd8a298dd9

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})