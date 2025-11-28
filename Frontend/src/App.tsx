
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landingpage from "./Pages/Landingpage"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import GetStarted from "./Pages/Get-Started"
import AdminDashboard from "./Protected/Admin/AdminDashboard"
import UserDashboard from "./Protected/User/UserDashboard"
import UnAuthorized from "./Pages/UnAuthorized"

import AuthChecker from "./Auth/AuthChecker"
import ProtectedRoute from "./Auth/ProtectedRoute"

import { Toaster } from 'react-hot-toast';



export default function App() {


  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthChecker />
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<Landingpage />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />


          {/* protected routes */}


          <Route path="/admin" element={<ProtectedRoute requiredRole="admin">   <AdminDashboard /></ProtectedRoute>} />

          <Route path="/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </div >
  )

}