import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function RestaurantFoods() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/api/food/restaurant/${restaurantId}`,
          { withCredentials: true }
        );

        setFoods(res.data.foods);
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

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Foods</h1>

        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/add-food/${restaurantId}`)}
        >
          Add Food
        </button>
      </div>

      {foods.length === 0 ? (
        <p className="text-gray-500">No foods added yet.</p>
      ) : (
        <div className="space-y-4">
          {foods.map((food) => (
            <div
              key={food._id || food.id}
              className="border p-4 rounded shadow-sm flex justify-between"
            >
              <span className="font-medium">{food.name}</span>
              <span>Rs. {food.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantFoods;
