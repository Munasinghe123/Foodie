
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
import RestaurantsPage from "./Protected/Admin/RestaurantsPage"
import UsersPage from "./Protected/Admin/UsersPage"

import AuthChecker from "./Auth/AuthChecker"
import ProtectedRoute from "./Auth/ProtectedRoute"
import AdminLayout from "./Components/AdminLayout"

import { Toaster } from 'react-hot-toast';

import { useSelector } from "react-redux"
import type { RootState } from "./store/store"


export default function App() {

  const { role } = useSelector((state: RootState) => state.user.user || { role: "" });


  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <BrowserRouter>
        <AuthChecker />

        {role !== "admin" && (
          <Header />
        )}

        <Routes>
          {/* open routes */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />

          {/* protected routes */}

          {/* admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                {/* parent route */}
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* default nested route */}
            <Route index element={<AdminDashboard />} />
            {/* other nested routes */}
            <Route path="restaurants" element={<RestaurantsPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>


          <Route path="/user" element={<ProtectedRoute requiredRole="user"><UserDashboard /></ProtectedRoute>} />
          <Route path="/register-resturant" element={<ProtectedRoute requiredRole="user"><RegisterResturant /></ProtectedRoute>} />
          <Route path="/payment/success" element={<ProtectedRoute ><Success /></ProtectedRoute>} />
        </Routes>
        {role !== "admin" && <Footer />}

      </BrowserRouter>

    </div >
  )

}