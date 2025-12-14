import React from 'react'
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/allUsers', { withCredentials: true });
        setUsers(response.data.users);

        const restaurantsResponse = await axios.get('http://localhost:7000/api/restaurant/allRestaurants', { withCredentials: true });
        const allRestaurants = restaurantsResponse.data.restaurants;
        setRestaurants(allRestaurants);

        const pending = allRestaurants.filter((rest:any)=> rest.status === "pending");
        setPendingApprovals(pending);

      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };
    fetchStats();
  }, [])


  return (
    <div className="h-screen w-full flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">

        <div className="bg-white shadow-md rounded-3xl p-6 flex flex-col items-center hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-orange-500">{users.length}</p>
        </div>

        <div className="bg-white shadow-md rounded-3xl p-6 flex flex-col items-center hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-2">Total Restaurants</h2>
          <p className="text-3xl font-bold text-orange-500">{restaurants.length}</p>
        </div>

        <div className="bg-white shadow-md rounded-3xl p-6 flex flex-col items-center hover:shadow-xl transition">
          <h2 className="text-xl font-semibold mb-2">Pending Approvals</h2>
          <p className="text-3xl font-bold text-orange-500">{pendingApprovals.length}</p>
        </div>

      </div>
    </div>

  )
}

export default AdminDashboard;
