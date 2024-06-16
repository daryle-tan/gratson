import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import Home from "./screens/Home.js"
import Whatis from "./screens/Whatis.js"
import AboutMe from "./screens/AboutMe.js"
import BookNow from "./screens/BookNow.js"

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Home />
      <Whatis />
      <AboutMe />

      {/* <Container></Container> */}
      <main className="py-3 flex-fill">
        <BookNow />
      </main>
      <Footer />
    </div>
  )
}

export default App
