import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function RestaurantOwnerDashboard() {

  const [restaurants, setRestaurants] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/restaurant/my-restaurants",
          { withCredentials: true })

        setRestaurants(response.data.restaurants);
        console.log(response.data.restaurants);
      } catch (err) {

        console.error(err);
      }
    }
    fetchData();
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Restaurant Owner Dashboard</h1>
      <p className="text-center mt-4">Manage your restaurant, menu, and orders from here.</p>

      <h1>My restaurants</h1>

      <div className="mt-6 space-y-4 max-w-3xl mx-auto">
        {restaurants.length === 0 ? (
          <p className="text-center text-gray-500">
            You don’t own any restaurants yet.
          </p>
        ) : (
          restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="border p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {restaurant.restaurantName}
                </h2>
              </div>

              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() =>
                  navigate(`/all-food/${restaurant.id}`)
                }
              >
                View All Food
              </button>

              <button
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                onClick={() =>
                  navigate(`/add-food/${restaurant.id}`)
                }
              >
                Add Food
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default RestaurantOwnerDashboard
