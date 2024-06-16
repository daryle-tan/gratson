import React, { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import axios from "axios"

const localizer = momentLocalizer(moment)

const Scheduler = () => {
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    // Fetch existing bookings from the server
    axios
      .get("/api/bookings")
      .then((response) => {
        const bookings = response.data.map((booking) => ({
          start: new Date(booking.date),
          end: new Date(moment(booking.date).add(1, "hours").toDate()),
          title: "Booked",
        }))
        setEvents(bookings)
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error)
      })
  }, [])

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start)
    console.log("Selected date:", start)
  }

  const handleBooking = () => {
    if (selectedDate) {
      axios
        .post("/api/bookings", { date: selectedDate })
        .then((response) => {
          const newEvent = {
            start: new Date(response.data.date),
            end: new Date(moment(response.data.date).add(1, "hours").toDate()),
            title: "Booked",
          }
          setEvents([...events, newEvent])
          alert("Booking successful!")
        })
        .catch((error) => {
          console.error("Error booking slot:", error)
        })
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
          min={new Date(2021, 1, 1, 9, 0)}
          max={new Date(2021, 1, 1, 17, 0)}
        />
        {selectedDate && (
          <form>
            <div>
              <div className="form-group mt-3 background-grey">
                <input
                  type="text"
                  id="selectedDate"
                  className="form-control"
                  value={selectedDate.toString()}
                  readOnly
                />
              </div>

              <div className="form-group mt-1">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group mt-1">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group mt-1">
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>

              <button onClick={handleBooking} className="btn btn-primary mt-3">
                Reserve Session
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Scheduler
