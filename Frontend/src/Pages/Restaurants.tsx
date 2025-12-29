import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Restaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7000/api/restaurant/allRestaurants",
          { withCredentials: true }
        );

        const approved = res.data.restaurants.filter(
          (r: any) => r.status === "approved"
        );
        setRestaurants(approved);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="w-full  py-10  h-screen">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Restaurants
      </h1>

      <div className="grid grid-cols-1 gap-10 mx-auto">
        {restaurants.map((data) => (
          <div
            key={data.id}
            className="relative group max-w-[350px] w-full mx-auto"
          >
            {/* FRONT CARD */}
            <div className="relative z-20 bg-white border-2 border-orange-400 rounded-2xl overflow-hidden shadow-md">
              {/* Image */}
              <img
                src={data.imageUrl}
                alt={data.restaurantName}
                className="w-full h-48 object-cover"
              />

              {/* Name */}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {data.restaurantName}
                </h2>
              </div>
            </div>

            {/* SLIDING CARD */}
            <div
              className="
                absolute inset-0 z-10
                bg-white border-2 border-orange-400 rounded-2xl shadow-sm
                p-6 flex flex-col justify-between
                transform transition-all duration-500 ease-in-out
                lg:translate-x-12 lg:group-hover:translate-x-[105%]
              "
            >
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {data.category}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Phone:</span>{" "}
                  {data.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Address:</span>{" "}
                  {data.address}
                </p>
              </div>

              <button
                onClick={() => navigate(`/all-food/${data.id}`)}
                className="mt-6 bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                View Foods
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
