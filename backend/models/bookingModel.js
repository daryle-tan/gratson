import mongoose from "mongoose"

const bookingSchema = mongoose.Schema(
  {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
const Booking = mongoose.model("Booking", bookingSchema)

export default Booking
