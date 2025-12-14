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
      <div className="w-full  overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 border-spacing-x-3">
          <thead>
            <tr className="text-center">

              <th className="relative ">
                <span className="absolute inset-0 flex items-center justify-center
                   text-2xl lg:text-4xl font-extrabold text-orange-400
                   pointer-events-none select-none">
                  Restaurant
                </span>

                <div className="relative mt-6 z-10 flex flex-col items-center">
                  <span className="text-xl font-bold">Name</span>
                </div>
              </th>

              <th className="relative p-6">
                <span className="absolute inset-0 flex items-center justify-center 
                   text-2xl lg:text-4xl font-extrabold text-orange-400 
                   pointer-events-none select-none">
                  Owner
                </span>

                <div className="relative z-10 mt-6 flex flex-col items-center">
                  <span className="text-xl font-bold">Name</span>
                </div>
              </th>

              <th className="relative p-6">
                <span className="absolute inset-0 flex items-center justify-center 
                   text-2xl lg:text-4xl font-extrabold text-orange-400
                   pointer-events-none select-none">
                  Registration
                </span>

                <div className="relative z-10 mt-6 flex flex-col items-center">
                  <span className="text-xl font-bold">Status</span>
                </div>
              </th>

  
              <th className="relative p-6">
                <span className="absolute inset-0 flex items-center justify-center 
                   text-2xl lg:text-4xl font-extrabold text-orange-400 
                   pointer-events-none select-none">
                  Status
                </span>

                <div className="relative z-10 mt-6 flex flex-col items-center">
                  <span className="text-xl font-bold">Actions</span>
                </div>
              </th>

            </tr>
          </thead>


          <tbody>
            {restaurants.map((restaurant: any) => (
              <tr key={restaurant._id}>

                {/* STICKY COLUMN */}
                <td className="p-4 bg-gray-200 rounded-lg shadow-sm 
                       sticky left-0 z-20 ">
                  {restaurant.restaurantName}
                </td>

                <td className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                  {restaurant.ownerName}
                </td>

                <td className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
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

                <td className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 
                       text-center flex justify-center gap-3">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow">
                    Approve
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow">
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
