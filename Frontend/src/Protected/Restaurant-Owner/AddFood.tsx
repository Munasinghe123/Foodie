import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AddFood() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:7000/api/food/add",
        {
          name,
          price: Number(price),
          restaurantId,
        },
        { withCredentials: true }
      );

      alert("Food added successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center w-full  h-screen ">
      <div className=" mt-10 p-6 border rounded-lg shadow w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Food</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Food Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            {loading ? "Adding..." : "Add Food"}
          </button>
        </form>
      </div>
    </div>

  );
}

export default AddFood;
