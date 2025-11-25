
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landingpage from "./Pages/Landingpage"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import GetStarted from "./Pages/Get-Started"


export default function App() {

  return (
    <div>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/get-started" element={<GetStarted />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )

}