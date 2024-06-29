import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import Home from "./screens/Home.js"
import Whatis from "./screens/Whatis.js"
import AboutMe from "./screens/AboutMe.js"
import BookNow from "./screens/BookNow.js"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer />
      <Header />
      <Home />

      <section id="whatIs">
        <Whatis />
      </section>

      <div className="container-custom-split d-flex justify-content-center m-4">
        <div className="custom-split"></div>
      </div>

      <section id="aboutMe">
        <AboutMe />
      </section>

      <section id="bookNow">
        <BookNow />
      </section>

      <Footer />
    </div>
  )
}

export default App
