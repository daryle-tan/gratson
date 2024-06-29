import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname } from "path"
import connectDB from "./config/db.js"
import asyncHandler from "./middleware/asyncHandler.js"
import Booking from "./models/bookingModel.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import twilio from "twilio"
dotenv.config()
import path from "path"
import nodemailer from "nodemailer"

const app = express()
const port = process.env.PORT || 5000

connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")))
} else {
  app.get("/", function (req, res) {
    res.send("API is running...")
  })
}

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN,
// )

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL, // your email
    pass: process.env.SMTP_PASSWORD, // your email password
  },
})

// @desc Fetch all bookings
// @route GET/api/bookings
app.get(
  "/api/bookings",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.find({})
    res.json(bookings)
  }),
)

// @desc Fetch a booking by id
// @route GET/api/bookings/:id
app.get(
  "/api/booking/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const booking = await Booking.findById(id)
    res.status(200).json(booking)
  }),
)

// @desc Create a new booking
// @route POST/api/bookings
app.post(
  "/api/bookings",
  asyncHandler(async (req, res) => {
    const { start, end, name, email, phone } = req.body
    if (!start || !end || !name || !email || !phone) {
      res.status(400)
      throw new Error("All fields are required")
    }
    const newBooking = new Booking({ start, end, name, email, phone })
    const booking = await newBooking.save()
    console.log(req.body, booking)

    // Send SMS
    const message = await twilioClient.messages.create({
      body: `Hello ${name}, your session is booked from ${start} to ${end}.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })

    // Send email to client
    const clientMailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Booking Confirmation",
      text: `Dear ${name},\n\nYour booking from ${start} to ${end} has been confirmed.\n\nThank you!`,
    }

    // Send email to admin
    const adminMailOptions = {
      from: process.env.SMTP_MAIL,
      to: process.env.SMTP_MAIL,
      subject: "New Booking Notification",
      text: `New booking from ${name}.\n\nDetails:\nStart: ${start}\nEnd: ${end}\nEmail: ${email}\nPhone: ${phone}`,
    }

    // Send emails
    await transporter.sendMail(clientMailOptions)
    await transporter.sendMail(adminMailOptions)

    res.status(201).json(booking)
  }),
)

// @desc Delete a booking
// @route DELETE/api/bookings
app.delete(
  "/api/booking/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const cancelBooking = await Booking.findByIdAndDelete(id)

    if (!cancelBooking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    res.status(200).json({ message: "Booking canceled successfully!" })
  }),
)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
