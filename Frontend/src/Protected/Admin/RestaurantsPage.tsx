import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

function RestaurantsPage() {


  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {

    const fetchStats = async () => {
      try {

        const restaurantsResponse = await axios.get('http://localhost:7000/api/restaurant/allRestaurants', { withCredentials: true });
        const allRestaurants = restaurantsResponse.data.restaurants;
        setRestaurants(allRestaurants);

      } catch (error) {
        console.error("Error fetching admin stats:", error);
      }
    };
    fetchStats();
  }, [])


  return (
    <div>
  <h1 className="text-xl font-bold mb-4">RestaurantsPage</h1>

 <div className="w-full overflow-x-auto">
  <table className="min-w-max w-full border-collapse shadow-md">
    <thead>
      <tr className="bg-gray-100 text-gray-700 text-sm">

        {/* Sticky Header Cell */}
        <th className="p-4 text-left font-semibold sticky left-0 z-20 bg-gray-100 border-r border-gray-300">
          Restaurant Name
        </th>

        <th className="p-4 text-left font-semibold border-r border-gray-300">Owner</th>
        <th className="p-4 text-center font-semibold border-r border-gray-300">Status</th>
        <th className="p-4 text-center font-semibold">Actions</th>
      </tr>
    </thead>

    <tbody>
      {restaurants.map((restaurant: any, index: number) => (
        <tr
          key={restaurant._id}
          className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b`}
        >

          {/* Sticky Column Cell */}
          <td className="p-4 font-medium text-gray-900 sticky left-0 z-10 bg-white border-r border-gray-200">
            {restaurant.restaurantName}
          </td>

          <td className="p-4 text-gray-700 border-r border-gray-200">
            {restaurant.ownerName}
          </td>

          <td className="p-4 text-center border-r border-gray-200">
            <span
              className={`px-3 py-1 rounded-lg text-sm font-semibold
                ${restaurant.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : restaurant.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {restaurant.status}
            </span>
          </td>

          <td className="p-4 text-center flex justify-center gap-3">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow transition">
              Approve
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow transition">
              Reject
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>

  )
}

export default RestaurantsPage
