
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landingpage from "./Pages/Landingpage"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import GetStarted from "./Pages/Get-Started"

import {Toaster} from 'react-hot-toast';

export default function App() {

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
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