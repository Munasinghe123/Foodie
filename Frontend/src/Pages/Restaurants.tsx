import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Restaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    <div className="w-full px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-12 text-center">
        Restaurants
      </h1>

      <div className="grid grid-cols-1 gap-12 w-full max-w-4xl">
        {restaurants.map((data, i) => (
          <div
            key={data.id}
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
              className={`
                relative overflow-hidden transition-all duration-500 ease-in-out
                bg-white border-orange-400 border-2 rounded-2xl space-y-20 shadow-sm p-6

                /* MOBILE: peek + slide down */
                ${activeIndex === i ? "translate-y-[340px]" : "translate-y-20"}
                mt-[-330px] h-[300px]

                /* DESKTOP: slide right */
                lg:absolute lg:inset-0 lg:mt-0 lg:h-auto
                lg:translate-x-14 lg:group-hover:translate-x-[102%]
                lg:translate-y-0 lg:group-hover:translate-y-0
              `}
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
                View Foods
              </button>
            </div>

            {/* SPACER — pushes next card on mobile */}
            <div
              className={`
                transition-all duration-500 ease-in-out
                ${activeIndex === i ? "h-[340px]" : "h-20"}
                lg:hidden
              `}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
