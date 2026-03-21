require("dotenv").config()

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const username = process.env.ADMIN_USERNAME || "admin"
        const plainPassword = process.env.ADMIN_PASSWORD || "admin123"

        const hashedPassword = await bcrypt.hash(plainPassword, 10)

        const existingAdmin = await Admin.findOne({ username })

        if (existingAdmin) {
            existingAdmin.password = hashedPassword
            await existingAdmin.save()
            console.log(`Admin updated: ${username}`)
        } else {
            await Admin.create({
                username,
                password: hashedPassword
            })
            console.log(`Admin created: ${username}`)
        }

        await mongoose.connection.close()
        process.exit(0)
    } catch (error) {
        console.error("Failed to seed admin:", error.message)
        process.exit(1)
    }
}

seedAdmin()