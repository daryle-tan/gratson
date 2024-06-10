import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="py-3 flex-fill">
        <Container>
          <h1>Welcome to Gratson</h1>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App
