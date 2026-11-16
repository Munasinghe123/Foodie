import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { addToCart } from "../../redux/cartSlice";



interface Food {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  restaurantId : string;
}


function RestaurantFoods() {

  const dispatch = useDispatch();

  const { role } = useSelector((state: RootState) => state.user.user || { role: "" });

  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/api/food/restaurant/${restaurantId}`,
          { withCredentials: true }
        );

        setFoods(res.data.foods);
        console.log("all food from the db", res.data.foods)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [restaurantId]);

  if (loading) {
    return <p className="text-center mt-10">Loading foods...</p>;
  }

  const handleCart = (food:Food) => {
    dispatch(addToCart({
      id: food._id,
      name: food.name,
      price: food.price,
      imageUrl: food.imageUrl,
      restaurantId : restaurantId!,

    }));
  }

  return (
    <div className="max-w-3xl mx-auto xl:pt-36 h-screen">
      <div className="flex justify-center items-center w-full mb-6">
        <h1 className="text-2xl font-bold">All food</h1>

        {
          role == "restaurantOwner" && (
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded"
              onClick={() => navigate(`/add-food/${restaurantId}`)}
            >
              Add Food
            </button>
          )
        }

      </div>

      {foods.length === 0 ? (
        <p className="text-gray-500">No foods added yet.</p>
      ) : (
        <div className="space-y-4">
          {foods.map((food, i) => (

            <div
              key={food._id}
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
                    src={food.imageUrl}
                    alt={food.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="w-full mt-5 flex justify-between items-center">
                  {/* Name */}
                  <h2 className=" text-xl font-semibold text-gray-800">
                    {food.name}
                  </h2>

                  <p className="">Rs. {food.price}</p>
                </div>

              </div>

              {/* BACK CARD */}
              <div
                className={`  
                relative overflow-hidden transition-all duration-500 ease-in-out flex items-center justify-center flex-col
                bg-white border-orange-400 border-2 rounded-2xl  shadow-sm p-6

                /* MOBILE: peek + slide down */
                ${activeIndex === i ? "translate-y-[340px]" : "translate-y-20"}
                mt-[-330px] h-[300px]

                /* DESKTOP: slide right */
                lg:absolute lg:inset-0 lg:mt-0 lg:h-auto
                lg:translate-x-14 lg:group-hover:translate-x-[102%]
                lg:translate-y-0 lg:group-hover:translate-y-0
              `}
              >
                <p className=" ">
                  Close the laptop at midnight knowing this:
                  You didn’t just pass time in 2025 — you invested it.
                  Most people are partying.
                  You’re shipping brain gains.
                  Low-key poetic ending:
                  {food.description}
                </p>

                <button
                  onClick={() => handleCart(food)}
                  className="mt-6 w-fit p-8 bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  Add to cart
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
      )}
    </div>
  );
}

export default RestaurantFoods;
