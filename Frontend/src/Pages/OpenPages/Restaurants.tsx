import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Restaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rotate, setRotate] = useState(true);

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
    <div className="w-full px-6 py-10  xl:mt-20 flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold mb-12 text-center">
        Restaurants
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 w-full max-w-4xl">
        {restaurants.map((data, i) => (
          <div
            key={data.id}
            className="group relative w-full h-[320px] perspective"
          >
            {/* ROTATING CONTAINER */}
            <div
              className={`
        relative w-full h-full
        transition-transform duration-700
        transform-style-preserve-3d

        ${activeIndex === i ? "rotate-y-180" : ""}
        lg:group-hover:rotate-y-180
      `}
              onClick={() => {
                if (window.innerWidth <= 1024) {
                  setActiveIndex(prev => (prev === i ? null : i));
                }
              }}
            >
              {/* FRONT CARD */}
              <div
                className="
                  absolute inset-0 backface-hidden
                  border-2 border-orange-400 rounded-2xl
                  p-4 shadow-md bg-white cursor-pointer
                "
              >

                {/* Image */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={data.imageUrl}
                    alt={data.restaurantName}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Name */}
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                  {data.restaurantName}
                </h2>
              </div>

              {/* BACK CARD */}
              <div
                className="
                absolute inset-0 backface-hidden rotate-y-180
                border-2 border-orange-400 rounded-2xl
                p-6 bg-white
                flex flex-col justify-between
              "
              >

                <div className="bg-white">
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
                  className="mt-6 w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  View Food
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
