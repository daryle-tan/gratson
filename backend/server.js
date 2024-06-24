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
dotenv.config()
import path from "path"

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
    res.status(201).json(booking)
  }),
)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
