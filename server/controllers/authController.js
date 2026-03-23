const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER ADMIN
exports.register = async (req, res) => {
  try {

    const { username, password } = req.body

    const exists = await Admin.findOne({ username })
    if (exists) {
      return res.status(400).json({ message: "Admin exists" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const admin = new Admin({
      username,
      password: hashed
    })

    await admin.save()

    res.json({ message: "Admin created" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// LOGIN ADMIN
exports.login = async (req, res) => {
  try {

    const { username, password } = req.body

    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, admin.password)
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}