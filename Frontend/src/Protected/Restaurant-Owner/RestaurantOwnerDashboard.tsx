import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RestaurantOwnerDashboard() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/restaurant/my-restaurants",
          { withCredentials: true }
        );

        setRestaurants(response.data.restaurants);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-2">
        Welcome to the Restaurant Owner Dashboard
      </h1>
      <p className="text-center mb-10 text-gray-600">
        Manage your restaurant, menu, and orders from here.
      </p>

      <h2 className="text-xl font-semibold mb-6">My Restaurants</h2>

      <div className="grid grid-cols-1 gap-12 w-full max-w-4xl">
        {restaurants.length === 0 ? (
          <p className="text-center text-gray-500">
            You don’t own any restaurants yet.
          </p>
        ) : (
          restaurants.map((restaurant, i) => (
            <div
              key={restaurant.id}
              className="relative max-w-[350px] w-full group flex flex-col mx-auto"
            >
              {/* FRONT CARD */}
              <div
                className="relative z-20 border-2 border-orange-400 rounded-2xl p-4 shadow-md bg-white w-full cursor-pointer"
                onClick={() =>
                  setActiveIndex((prev) => (prev === i ? null : i))
                }
              >
                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.restaurantName}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Name */}
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                  {restaurant.restaurantName}
                </h2>
              </div>

              {/* BACK CARD */}
              <div
                className={`
                  relative overflow-hidden transition-all duration-500 ease-in-out
                  bg-white border-orange-400 border-2 rounded-2xl shadow-sm p-6
                  flex flex-col justify-between

                  /* MOBILE: peek + slide down */
                  ${activeIndex === i ? "translate-y-[340px]" : "translate-y-20"}
                  mt-[-330px] h-[300px]

                  /* DESKTOP: slide right */
                  lg:absolute lg:inset-0 lg:mt-0 lg:h-auto
                  lg:translate-x-14 lg:group-hover:translate-x-[102%]
                  lg:translate-y-0 lg:group-hover:translate-y-0
                `}
              >
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Category:</span>{" "}
                    {restaurant.category}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Phone:</span>{" "}
                    {restaurant.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Address:</span>{" "}
                    {restaurant.address}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                  <button
                    onClick={() =>
                      navigate(`/all-food/${restaurant.id}`)
                    }
                    className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition"
                  >
                    View All Food
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/add-food/${restaurant.id}`)
                    }
                    className="w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                  >
                    Add Food
                  </button>
                </div>
              </div>

              {/* SPACER (mobile only) */}
              <div
                className={`
                  transition-all duration-500 ease-in-out
                  ${activeIndex === i ? "h-[340px]" : "h-20"}
                  lg:hidden
                `}
              ></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RestaurantOwnerDashboard;
