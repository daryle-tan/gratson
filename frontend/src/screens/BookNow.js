import React, { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const localizer = momentLocalizer(moment)

const BookNow = () => {
  const [events, setEvents] = useState([])
  const [reserved, setReserved] = useState(false)
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")

  useEffect(() => {
    // Fetch existing bookings from the server
    axios
      .get("/api/bookings")
      .then((response) => {
        const bookings = response.data.map((booking) => ({
          start: new Date(booking.start),
          end: new Date(booking.end),
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
        }))
        setEvents(bookings)
        console.log(bookings) //remove me later
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error)
      })
  }, [reserved])

  const isAllowedTimeSlot = (date) => {
    const day = date.getDay()
    const hour = date.getHours()

    // Mon-Fri 7am - 9am
    if (day >= 1 && day <= 5 && hour >= 7 && hour < 9) {
      return true
    }
    // Evening Wed-Thu 5pm-7pm
    if (day >= 3 && day <= 4 && hour >= 17 && hour < 19) {
      return true
    }
    // Weekends 9am-12pm
    if ((day === 0 || day === 6) && hour >= 9 && hour < 12) {
      return true
    }
    return false
  }

  const handleSelectSlot = ({ start, end }) => {
    if (!isAllowedTimeSlot(start)) {
      toast.error("Selected time slot is not available for booking.")
      return
    }

    if (selectedSlot) {
      const isAdjacent =
        moment(start).isSame(moment(selectedSlot).add(30, "minutes")) ||
        moment(start).isSame(moment(selectedSlot).subtract(30, "minutes"))

      if (isAdjacent) {
        setSelectedSlot({ start: selectedSlot, end: end })
      } else {
        setSelectedSlot(start)
      }
    } else {
      setSelectedSlot(start)
    }
    console.log("start", selectedSlot.start, "end", selectedSlot.end)
  }

  const handleBooking = (e) => {
    e.preventDefault()
    if (selectedSlot) {
      const bookingDate = selectedSlot.start || selectedSlot
      const bookingEndDate =
        selectedSlot.end || moment(bookingDate).add(30, "minutes").toDate()

      axios
        .post("/api/bookings", {
          start: bookingDate,
          end: bookingEndDate,
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
        })
        .then((response) => {
          const newEvent = {
            start: new Date(response.data.start),
            end: new Date(response.data.end),
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
          }
          console.log(
            "start NewEvent",
            newEvent.start,
            "end NewEvent",
            newEvent.end,
          )
          setEvents([...events, newEvent])
          setReserved(true)

          console.log("selectedSlot:", selectedSlot)
          setClientName("")
          setClientEmail("")
          setClientPhone("")
          setSelectedSlot("")
          toast.success("Booking successful!")
        })
        .catch((error) => {
          console.error("Error booking slot:", error)
        })
    }
  }

  const getSlotStyle = (date) => {
    const dateTimestamp = date.getTime()
    const isBooked = events.some(
      (event) =>
        dateTimestamp >= new Date(event.start).getTime() &&
        dateTimestamp < new Date(event.end).getTime(),
    )

    let selectedStart = selectedSlot
    let selectedEnd = moment(selectedSlot).add(1, "minutes").toDate()

    if (selectedSlot && selectedSlot.start && selectedSlot.end) {
      selectedStart = selectedSlot.start
      selectedEnd = selectedSlot.end
    }

    if (
      selectedStart &&
      selectedEnd &&
      selectedStart.getTime &&
      selectedEnd.getTime
    ) {
      if (
        dateTimestamp >= selectedStart.getTime() &&
        dateTimestamp < selectedEnd.getTime()
      ) {
        return { backgroundColor: "lightblue" }
      }
    } else if (
      selectedStart &&
      selectedStart.getTime &&
      dateTimestamp === selectedStart.getTime()
    ) {
      return { backgroundColor: "lightblue" }
    }

    return {
      backgroundColor: isBooked
        ? "darkgrey"
        : isAllowedTimeSlot(date)
        ? "#dff0d8"
        : "darkgrey",
    }
  }

  return (
    <div className="booking-container">
      <h1 className="display-2 text-white">Schedule Your Session</h1>
      <div className="scheduler-container">
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: 500 }}
          defaultView="week"
          views={["month", "week", "day"]}
          step={30}
          timeslots={1}
          min={new Date(2021, 1, 1, 7, 0)}
          max={new Date(2021, 1, 1, 19, 0)}
          slotPropGetter={(date) => ({
            style: getSlotStyle(date),
          })}
        />
        {selectedSlot && (
          <form className="true-form" onSubmit={handleBooking}>
            <div className="form-container">
              <div className="form-group mt-3 background-grey custom-schedule-label">
                <input
                  type="text"
                  id="selectedDate"
                  className="form-control"
                  value={`${moment(selectedSlot.start || selectedSlot).format(
                    "ddd, MMM D, h:mm A",
                  )} to ${
                    selectedSlot.end
                      ? moment(selectedSlot.end).format("h:mm A")
                      : moment(selectedSlot).add(30, "minutes").format("h:mm A")
                  }`}
                  readOnly
                  style={{ backgroundColor: "black", color: "white" }}
                  required
                />
              </div>

              <div className="form-group mt-1">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter Name"
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mt-1">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>

              <div className="form-group mt-1">
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Reserve Session
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default BookNow
