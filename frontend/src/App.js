import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import Home from "./screens/Home.js"
import Whatis from "./screens/Whatis.js"
const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Home />
      <Whatis />
      {/* <Container></Container> */}
      <main className="py-3 flex-fill"></main>
      <Footer />
    </div>
  )
}

export default App
