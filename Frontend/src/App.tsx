
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landingpage from "./Pages/Landingpage"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import GetStarted from "./Pages/Get-Started"
import AdminDashboard from "./Protected/Admin/AdminDashboard"
import UserDashboard from "./Protected/User/UserDashboard"
import UnAuthorized from "./Pages/UnAuthorized"
import RegisterResturant from "./Pages/RegisterResturant"
import Success from "./Pages/Payment/Success"

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
          <Route path="/user" element={<ProtectedRoute requiredRole="user"><UserDashboard /></ProtectedRoute>} />
          <Route path="/register-resturant" element={<ProtectedRoute requiredRole="user"><RegisterResturant /></ProtectedRoute>} />
          <Route path="/payment/success" element={<ProtectedRoute ><Success /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div >
  )

}