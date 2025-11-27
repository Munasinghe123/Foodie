
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landingpage from "./Pages/Landingpage"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import GetStarted from "./Pages/Get-Started"
import AdminDashboard from "./Protected/Admin/AdminDashboard"
import UserDashboard from "./Protected/User/UserDashboard"
import AuthChecker from "./Auth/AuthChecker"

import { useSelector } from "react-redux"
import { Toaster } from 'react-hot-toast';
import type { RootState } from "./store/store"

export default function App() {

  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthChecker />
      <BrowserRouter>
        <Header />
        <Routes>

          {
            isAuthenticated ? (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/user" element={<UserDashboard />} />
              </>

            ) : (
              <>
                <Route path="/" element={<Landingpage />} />
                <Route path="/get-started" element={<GetStarted />} />
              </>

            )
          }


        </Routes>
        <Footer />
      </BrowserRouter>

    </div >
  )

}