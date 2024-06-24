import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname } from "path"
import connectDB from "./config/db.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

connectDB()
let bookings = [] // This should be replaced with a real database in production
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, "build")))

app.get("/", function (req, res) {
  res.send("API is running...")
  //   res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.get("/api/bookings", (req, res) => {
  res.json(bookings)
})

app.post("/api/bookings/:id", (req, res) => {
  const booking = bookings.find((b) => b._id === req.params.id)
  res.status(201).json(booking)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
