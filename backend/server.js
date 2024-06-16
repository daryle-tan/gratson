const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000

let bookings = [] // This should be replaced with a real database in production

app.use(cors())
app.use(bodyParser.json())

app.get("/api/bookings", (req, res) => {
  res.json(bookings)
})

app.post("/api/bookings", (req, res) => {
  const { date } = req.body
  bookings.push({ date })
  res.status(201).json({ date })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
