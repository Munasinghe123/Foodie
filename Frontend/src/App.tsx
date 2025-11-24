
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landingpage from "./Pages/Landingpage"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

export default function App() {

  return (
    <div>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )

}